const ORIGINS = new Set(['https://nextgenius.com.au', 'https://www.nextgenius.com.au']);
const LIMIT = 20_000;
const unavailable = 'We could not confirm email delivery. Please try again or email info@nextgenius.com.au directly.';
const accepted = 'Your enquiry has been accepted for email delivery to NextGenius. We will reply to the email address you provided.';
const fields = new Set(['name', 'email', 'company', 'interest', 'message', 'subject', 'website']);
const control = /[\x00-\x1f\x7f]/;

function reply(request, status, message) {
  const origin = request.headers.get('Origin');
  const headers = new Headers({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', Vary: 'Origin' });
  if (ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Accept, Content-Type');
  }
  if (status === 405) headers.set('Allow', 'POST, OPTIONS');
  if (status === 204) return new Response(null, { status, headers });
  if (request.headers.get('Accept')?.includes('application/json')) return Response.json({ ok: status === 200, message }, { status, headers });
  headers.set('Content-Type', 'text/html; charset=utf-8');
  // All interpolated messages are fixed application strings, never form data.
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Enquiry | NextGenius</title><link rel="stylesheet" href="https://nextgenius.com.au/site.css"><main class="sec wrap"><h1>${status === 200 ? 'Thank you for getting in touch.' : 'Your enquiry needs another step.'}</h1><p>${message}</p><p><a href="https://nextgenius.com.au/contact/">Return to contact</a></p><p><a href="mailto:info@nextgenius.com.au">Email info@nextgenius.com.au</a></p></main></html>`, { status, headers });
}

async function readForm(request) {
  const type = request.headers.get('Content-Type') || '';
  if (!/^application\/x-www-form-urlencoded(?:;|$)/i.test(type) && !/^multipart\/form-data;/i.test(type)) throw new Error('type');
  if (Number(request.headers.get('Content-Length')) > LIMIT) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  let size = 0;
  const chunks = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > LIMIT) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  const data = await new Response(new Blob(chunks), { headers: { 'Content-Type': type } }).formData();
  const seen = new Set();
  for (const [key, value] of data) {
    if (!fields.has(key) || seen.has(key) || typeof value !== 'string') throw new Error('fields');
    seen.add(key);
  }
  return data;
}

export async function handleEnquiry(request, env) {
  if (!['/api/enquiries', '/api/enquiries/'].includes(new URL(request.url).pathname)) return reply(request, 404, 'Page not found.');
  if (!ORIGINS.has(request.headers.get('Origin'))) return reply(request, 403, 'Please submit your enquiry from the NextGenius website.');
  if (request.method === 'OPTIONS') return reply(request, 204, '');
  if (request.method !== 'POST') return reply(request, 405, 'Please use the contact form.');
  let data;
  try { data = await readForm(request); }
  catch { return reply(request, 400, 'Please use the contact form and keep your message under 5,000 characters.'); }
  const get = key => (data.get(key) || '').trim();
  const name = get('name'), email = get('email'), company = get('company'), interest = get('interest'), message = get('message'), subject = get('subject');
  if (get('website') || !name || name.length > 120 || control.test(name) || email.length > 254 || !/^[^\s@<>(),;:\\"]+@[^\s@<>(),;:\\"]+\.[^\s@<>(),;:\\"]+$/.test(email) || control.test(email) || company.length > 200 || control.test(company) || !interest || interest.length > 160 || control.test(interest) || !message || message.length > 5000 || subject.length > 120 || control.test(subject)) {
    return reply(request, 400, 'Please check your name, email, area of interest and message, then try again.');
  }
  // Fail closed if either delivery or abuse protection is missing.
  if (env.ENQUIRIES_ENABLED !== 'true' || !env.EMAIL?.send || !env.ENQUIRY_RATE_LIMIT?.limit || !env.ENQUIRY_TO) return reply(request, 503, unavailable);
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip) return reply(request, 503, unavailable);
  try {
    const { success } = await env.ENQUIRY_RATE_LIMIT.limit({ key: ip });
    if (!success) return reply(request, 429, 'Too many attempts. Please wait a minute or email info@nextgenius.com.au.');
    const receipt = await env.EMAIL.send({
      to: env.ENQUIRY_TO,
      from: { email: 'website@nextgenius.com.au', name: 'NextGenius website' },
      replyTo: email,
      subject: (subject || 'Website enquiry') + ': ' + interest,
      text: ['Website enquiry for info@nextgenius.com.au', '', 'Name: ' + name, 'Email: ' + email, 'Company or project: ' + (company || '—'), 'Interested in: ' + interest, '', message].join('\n'),
    });
    if (typeof receipt?.messageId !== 'string' || !receipt.messageId) return reply(request, 502, unavailable);
    return reply(request, 200, accepted);
  } catch {
    // Never log submitted personal details or expose provider internals.
    return reply(request, 503, unavailable);
  }
}

export default { fetch: handleEnquiry };
