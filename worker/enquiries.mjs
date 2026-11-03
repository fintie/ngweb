const MAX_BYTES = 20_000;
const unavailable = 'We could not confirm email delivery. Please try again or email info@nextgenius.com.au directly.';
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };

function reply(request, status, message) {
  if (request.headers.get('accept')?.includes('application/json')) {
    return Response.json({ ok: status === 200, message }, { status, headers });
  }
  // Only fixed application messages are rendered; submitted content is never echoed.
  return new Response(`<!doctype html><html lang="en-AU"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Enquiry | NextGenius</title><link rel="stylesheet" href="/site.css"><main class="sec wrap"><h1>${status === 200 ? 'Thank you for getting in touch.' : 'Your enquiry needs another step.'}</h1><p class="lead" style="margin-top:24px">${message}</p><p style="margin-top:24px"><a class="tlink" href="mailto:info@nextgenius.com.au">Email info@nextgenius.com.au</a></p><p style="margin-top:24px"><a class="tlink" href="/contact/">Return to contact</a></p></main></html>`, { status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
}

async function readForm(request) {
  const type = request.headers.get('content-type') ?? '';
  if (!type.startsWith('application/x-www-form-urlencoded') && !type.startsWith('multipart/form-data;')) throw new Error('type');
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  const chunks = []; let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BYTES) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  return new Response(new Blob(chunks), { headers: { 'Content-Type': type } }).formData();
}

export async function handleEnquiry(request, env, fetchEmail = fetch) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { ...headers, Allow: 'POST' } });
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply(request, 403, 'Please submit your enquiry from this website’s contact form.');
  let data;
  try { data = await readForm(request); }
  catch { return reply(request, 400, 'Please use the contact form and keep your message under 5,000 characters.'); }
  const field = name => typeof data.get(name) === 'string' ? data.get(name).trim() : '';
  const name = field('name'), email = field('email'), company = field('company'), interest = field('interest'), message = field('message'), subject = field('subject');
  if (field('website') || !name || name.length > 120 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@<>(),;:\\"]+@[^\s@<>(),;:\\"]+\.[^\s@<>(),;:\\"]+$/.test(email) || company.length > 200 || !interest || interest.length > 160 || /[\r\n]/.test(interest) || !message || message.length > 5000 || subject.length > 120 || /[\r\n]/.test(subject)) {
    return reply(request, 400, 'Please check your name, email, area of interest and message, then try again.');
  }
  // No preview sends, silent drops or pretend success when delivery is unconfigured.
  if (env.ENQUIRIES_ENABLED !== 'true' || !env.RESEND_API_KEY || !env.ENQUIRY_FROM || !env.ENQUIRY_RATE_LIMIT) return reply(request, 503, unavailable);
  try {
    const { success } = await env.ENQUIRY_RATE_LIMIT.limit({ key: request.headers.get('CF-Connecting-IP') ?? 'local' });
    if (!success) return reply(request, 429, 'Too many attempts. Please wait a minute before trying again, or email info@nextgenius.com.au.');
    // Identical content gets the same key for 24h. Retries cannot duplicate a message.
    const text = ['Name: ' + name, 'Email: ' + email, 'Company or project: ' + (company || '—'), 'Interested in: ' + interest, '', message].join('\n');
    const payload = { from: env.ENQUIRY_FROM, to: ['info@nextgenius.com.au'], reply_to: email, subject: (subject || 'Website enquiry') + ': ' + interest, text };
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(payload)));
    const key = 'enquiry/' + Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
    const response = await fetchEmail('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(payload), signal: AbortSignal.timeout(8000) });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== 'string' || !result.id) return reply(request, 502, unavailable);
    return reply(request, 200, 'Your enquiry has been accepted for email delivery to NextGenius. We will reply to the email address you provided to discuss the next step.');
  } catch { return reply(request, 503, unavailable); }
}
