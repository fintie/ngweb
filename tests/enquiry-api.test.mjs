import test from 'node:test';
import assert from 'node:assert/strict';
import { handleEnquiry } from '../worker/enquiry-api.mjs';
const values = { name: 'Test Person', email: 'test@example.com', company: 'Example', interest: 'AI & Automation', message: 'Synthetic enquiry', subject: 'Website enquiry', website: '' };
const req = (changes = {}, headers = {}) => new Request('https://enquiries.example/api/enquiries', { method: 'POST', headers: { Origin: 'https://nextgenius.com.au', Accept: 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...headers }, body: new URLSearchParams({ ...values, ...changes }) });
const env = () => ({ ENQUIRIES_ENABLED: 'true', ENQUIRY_TO: 'owner@example.com', ENQUIRY_RATE_LIMIT: { limit: async () => ({ success: true }) }, EMAIL: { send: async () => ({ messageId: 'mock-receipt' }) } });
test('sends only to the configured inbox with visitor reply-to and plain text', async () => {
  let sent; const settings = env(); settings.EMAIL.send = async p => { sent = p; return { messageId: 'mock' }; };
  const r = await handleEnquiry(req(), settings);
  assert.equal(r.status, 200); assert.equal((await r.json()).ok, true);
  assert.equal(sent.to, 'owner@example.com'); assert.equal(sent.replyTo, values.email); assert.equal(sent.html, undefined);
  assert.equal(sent.from.email, 'website@nextgenius.com.au'); assert.match(sent.text, /Synthetic enquiry/);
});
test('exact trusted origins receive CORS headers, hostile or originless callers cannot send', async () => {
  for (const origin of ['https://nextgenius.com.au', 'https://www.nextgenius.com.au']) {
    const r = await handleEnquiry(req({}, { Origin: origin }), env()); assert.equal(r.status, 200); assert.equal(r.headers.get('Access-Control-Allow-Origin'), origin);
  }
  for (const origin of ['', 'null', 'https://evil.example', 'https://nextgenius.com.au.evil.example']) {
    const s = env(); s.EMAIL.send = () => assert.fail('must not send'); const r = await handleEnquiry(req({}, { Origin: origin }), s);
    assert.equal(r.status, 403); assert.equal(r.headers.get('Access-Control-Allow-Origin'), null);
  }
});
test('disabled or incomplete bindings fail closed with a readable cross-origin error', async () => {
  for (const change of [{ ENQUIRIES_ENABLED: 'false' }, { EMAIL: null }, { ENQUIRY_TO: '' }, { ENQUIRY_RATE_LIMIT: null }]) {
    const r = await handleEnquiry(req(), { ...env(), ...change }); assert.equal(r.status, 503); assert.equal((await r.json()).ok, false); assert.equal(r.headers.get('Access-Control-Allow-Origin'), 'https://nextgenius.com.au');
  }
});
test('validation rejects injection, honeypots and oversized fields before sending', async () => {
  for (const change of [{ name: '' }, { name: 'X\r\nBcc: bad' }, { email: 'x@y.com\r\nBcc: z@x.com' }, { subject: 'X\nBcc: bad' }, { interest: 'X\r\nY' }, { company: 'x\u0000y' }, { website: 'bot' }, { message: 'x'.repeat(5001) }]) {
    const s = env(); s.EMAIL.send = () => assert.fail('must not send'); assert.equal((await handleEnquiry(req(change), s)).status, 400);
  }
});
test('streaming body limit rejects oversized requests', async () => { assert.equal((await handleEnquiry(req({ message: 'x'.repeat(30000) }), env())).status, 400); });
test('rate-limited requests cannot send', async () => { const s = env(); s.ENQUIRY_RATE_LIMIT.limit = async () => ({ success: false }); s.EMAIL.send = () => assert.fail('must not send'); assert.equal((await handleEnquiry(req(), s)).status, 429); });
test('missing trusted IP fails closed', async () => { assert.equal((await handleEnquiry(req({}, { 'CF-Connecting-IP': '' }), env())).status, 503); });
test('provider failures and missing receipts never report success', async () => {
  for (const send of [async () => { throw new Error('provider'); }, async () => ({}), async () => undefined]) {
    const s = env(); s.EMAIL.send = send; const r = await handleEnquiry(req(), s); assert.ok(r.status >= 500); assert.equal((await r.json()).ok, false);
  }
});
test('valid preflight is supported, other methods and routes cannot submit', async () => {
  const headers = { Origin: 'https://nextgenius.com.au', Accept: 'application/json' };
  assert.equal((await handleEnquiry(new Request('https://api.example/api/enquiries', { method: 'OPTIONS', headers }), env())).status, 204);
  const get = await handleEnquiry(new Request('https://api.example/api/enquiries', { headers }), env()); assert.equal(get.status, 405); assert.equal(get.headers.get('Allow'), 'POST, OPTIONS');
  assert.equal((await handleEnquiry(new Request('https://api.example/other', { headers }), env())).status, 404);
});
test('duplicate fields, attachments and unexpected payload types are rejected', async () => {
  const body = new URLSearchParams(values); body.append('email', 'other@example.com');
  const headers = { Origin: 'https://nextgenius.com.au', 'CF-Connecting-IP': '192.0.2.1' };
  assert.equal((await handleEnquiry(new Request('https://api.example/api/enquiries', { method: 'POST', headers, body }), env())).status, 400);
  const form = new FormData(); for (const [k,v] of Object.entries(values)) form.set(k,v); form.set('name', new Blob(['file']), 'file.txt');
  assert.equal((await handleEnquiry(new Request('https://api.example/api/enquiries', { method: 'POST', headers, body: form }), env())).status, 400);
  assert.equal((await handleEnquiry(new Request('https://api.example/api/enquiries', { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(values) }), env())).status, 400);
});
test('non-JavaScript response never echoes user markup', async () => {
  const r = await handleEnquiry(req({ message: '<script>bad()</script>' }, { Accept: 'text/html' }), env()); assert.equal(r.status, 200); const html = await r.text(); assert.doesNotMatch(html, /bad\(\)/); assert.match(html, /https:\/\/nextgenius.com.au\/contact\//);
});
