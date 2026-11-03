import test from 'node:test';
import assert from 'node:assert/strict';
import { handleEnquiry } from '../worker/enquiries.mjs';
import worker from '../worker/index.mjs';
import { redirects } from '../site/src/data/redirects.js';

const env = () => ({ ENQUIRIES_ENABLED: 'true', RESEND_API_KEY: 'test-only', ENQUIRY_FROM: 'Website <website@example.com>', ENQUIRY_RATE_LIMIT: { limit: async () => ({ success: true }) } });
const fields = { name: 'Preview Person', email: 'preview@example.com', company: 'Example business', interest: 'AI & Automation', message: 'A test enquiry, with no real customer information.', subject: 'Website enquiry' };
function request(values = {}, headers = {}, url = 'https://nextgenius.example/api/enquiries') {
  return new Request(url, { method: 'POST', headers: { Origin: new URL(url).origin, Accept: 'application/json', ...headers }, body: new URLSearchParams({ ...fields, ...values }) });
}
const accepted = async () => Response.json({ id: 'test-receipt' });

test('valid enquiry goes only to the fixed inbox, with reply-to and a receipt', async () => {
  let captured;
  const response = await handleEnquiry(request(), env(), async (url, options) => { captured = { url, ...options }; return accepted(); });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  const payload = JSON.parse(captured.body);
  assert.equal(captured.url, 'https://api.resend.com/emails');
  assert.deepEqual(payload.to, ['info@nextgenius.com.au']);
  assert.equal(payload.reply_to, fields.email);
  assert.match(payload.text, /Preview Person/);
  assert.equal(payload.html, undefined);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});
test('identical retries use the same idempotency key; changed content gets a new one', async () => {
  const keys = [];
  const send = async (_, options) => { keys.push(options.headers['Idempotency-Key']); return accepted(); };
  await handleEnquiry(request(), env(), send);
  await handleEnquiry(request(), env(), send);
  await handleEnquiry(request({ message: 'A different workflow.' }), env(), send);
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[1], keys[2]);
});
test('unconfigured or disabled delivery never reports success or contacts the provider', async () => {
  for (const overrides of [{ RESEND_API_KEY: undefined }, { ENQUIRY_FROM: undefined }, { ENQUIRY_RATE_LIMIT: undefined }, { ENQUIRIES_ENABLED: 'false' }]) {
    const response = await handleEnquiry(request(), { ...env(), ...overrides }, () => assert.fail('must not send'));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
  }
});
test('provider failure, malformed receipts and network failures never report success', async () => {
  for (const send of [async () => Response.json({ error: 'failure' }, { status: 429 }), async () => Response.json({}), async () => new Response('not JSON'), async () => { throw new Error('network failure'); }]) {
    const response = await handleEnquiry(request(), env(), send);
    assert.ok(response.status >= 500);
    assert.equal((await response.json()).ok, false);
  }
});
test('invalid fields, header injection and honeypot entries never send', async () => {
  for (const invalid of [{ name: '' }, { email: 'invalid' }, { email: 'x@example.com\r\nBcc: x@y.com' }, { interest: '' }, { subject: 'Injected\nHeader' }, { name: 'A\nB' }, { message: '' }, { message: 'a'.repeat(5001) }, { website: 'https://spam.example' }]) {
    const response = await handleEnquiry(request(invalid), env(), () => assert.fail('must not send'));
    assert.equal(response.status, 400);
  }
});
test('cross-origin and originless submissions are rejected', async () => {
  for (const origin of ['https://other.example', 'null', '']) {
    assert.equal((await handleEnquiry(request({}, { Origin: origin }), env(), () => assert.fail('must not send'))).status, 403);
  }
});
test('GET cannot submit or expose a success response', async () => {
  const response = await handleEnquiry(new Request('https://nextgenius.example/api/enquiries?email=test@example.com'), env());
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
});
test('rate limited requests do not send', async () => {
  const settings = env(); settings.ENQUIRY_RATE_LIMIT.limit = async () => ({ success: false });
  assert.equal((await handleEnquiry(request(), settings, () => assert.fail('must not send'))).status, 429);
});
test('oversized streamed request without content-length is rejected', async () => {
  const response = await handleEnquiry(request({ message: 'a'.repeat(25_000) }), env(), () => assert.fail('must not send'));
  assert.equal(response.status, 400);
});
test('unexpected content types and file values are rejected', async () => {
  const json = new Request('https://nextgenius.example/api/enquiries', { method: 'POST', headers: { Origin: 'https://nextgenius.example', 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(fields) });
  assert.equal((await handleEnquiry(json, env())).status, 400);
  const body = new FormData(); for (const [key, value] of Object.entries(fields)) body.set(key, value);
  body.set('name', new Blob(['file']), 'name.txt');
  const fileRequest = new Request('https://nextgenius.example/api/enquiries', { method: 'POST', headers: { Origin: 'https://nextgenius.example' }, body });
  assert.equal((await handleEnquiry(fileRequest, env())).status, 400);
});
test('non-JavaScript POST receives a readable result without echoing submitted HTML', async () => {
  const response = await handleEnquiry(request({ message: '<script>bad()</script>' }, { Accept: 'text/html' }), env(), accepted);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  const html = await response.text();
  assert.match(html, /accepted for email delivery/);
  assert.doesNotMatch(html, /bad\(\)/);
});
test('all legacy redirects are permanent, preserve queries and stay on the current host', async () => {
  for (const [from, to] of Object.entries(redirects)) {
    for (const pathname of [from, from.slice(0, -1)]) {
      const response = await worker.fetch(new Request('https://preview.example' + pathname + '?from=legacy'), {});
      assert.equal(response.status, 301);
      assert.equal(response.headers.get('location'), 'https://preview.example' + to + '?from=legacy');
    }
  }
});
test('test Worker serves assets with noindex and routes the API ahead of assets', async () => {
  const bindings = { ASSETS: { fetch: async () => new Response('static') } };
  const response = await worker.fetch(new Request('https://preview.example/'), bindings);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(await response.text(), 'static');
  assert.equal((await worker.fetch(request(), bindings)).status, 503);
});
