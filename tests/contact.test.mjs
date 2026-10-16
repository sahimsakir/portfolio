import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';
const originalFetch = globalThis.fetch;
const saved = { ...process.env };
after(() => { globalThis.fetch = originalFetch; process.env = saved; });
const valid = { name: 'Test Visitor', email: 'visitor@example.com', subject: 'Project inquiry', message: 'A fictional test message.' };
let ip = 0;
function request(body = valid, extra = {}) {
  return { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://portfolio.example', 'x-real-ip': `test-${++ip}` }, body, ...extra };
}
async function run(req) {
  const res = { headers: {}, statusCode: 200, setHeader(key, value) { this.headers[key] = value; }, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
  await handler(req, res); return res;
}
process.env.CONTACT_SITE_URL = 'https://portfolio.example';
process.env.RESEND_API_KEY = 'test-only';
process.env.CONTACT_FROM_EMAIL = 'Portfolio <contact@example.com>';
process.env.CONTACT_TO_EMAIL = 'owner@example.com';
test('only allows POST and JSON', async () => {
  assert.equal((await run(request(valid, { method: 'GET' }))).statusCode, 405);
  assert.equal((await run(request(valid, { headers: {} }))).statusCode, 415);
});
test('rejects unexpected origins and malformed JSON', async () => {
  assert.equal((await run(request(valid, { headers: { 'content-type': 'application/json', origin: 'https://other.example' } }))).statusCode, 403);
  assert.equal((await run(request('{broken'))).statusCode, 400);
});
test('rejects invalid fields, header injection and oversized requests', async () => {
  for (const body of [{ ...valid, email: 'bad' }, { ...valid, subject: 'hi\r\nBcc: other@example.com' }, { ...valid, message: 'short' }, { ...valid, name: ' ' }]) assert.equal((await run(request(body))).statusCode, 400);
  assert.equal((await run(request({ ...valid, message: 'x'.repeat(17000) }))).statusCode, 413);
});
test('honeypot does not send an email', async () => {
  globalThis.fetch = () => { throw new Error('Should not call provider'); };
  assert.equal((await run(request({ ...valid, website: 'spam' }))).statusCode, 200);
});
test('successful submission has fixed recipient and visitor reply-to', async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.to, ['owner@example.com']);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.from, process.env.CONTACT_FROM_EMAIL);
    assert.match(payload.text, /fictional test/);
    return { ok: true, json: async () => ({ id: 'test-receipt' }) };
  };
  const result = await run(request({ ...valid, to: 'attacker@example.com' }));
  assert.equal(result.statusCode, 200); assert.equal(result.body.ok, true);
});
test('missing configuration and provider failures never report success', async () => {
  const key = process.env.RESEND_API_KEY; delete process.env.RESEND_API_KEY;
  assert.equal((await run(request())).statusCode, 503); process.env.RESEND_API_KEY = key;
  globalThis.fetch = async () => ({ ok: false });
  assert.equal((await run(request())).statusCode, 502);
  globalThis.fetch = async () => { throw new Error('timeout'); };
  assert.equal((await run(request())).statusCode, 502);
});
test('limits repeated requests from one instance IP', async () => {
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ id: 'test' }) });
  const req = request(); for (let i = 0; i < 5; i++) assert.equal((await run(req)).statusCode, 200);
  const result = await run(req); assert.equal(result.statusCode, 429); assert(result.headers['Retry-After']);
});
