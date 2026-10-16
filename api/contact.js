// Vercel Node.js Function. Credentials are server-only environment variables.
const attempts = new Map();
const windowMs = 10 * 60 * 1000;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ error: 'JSON content is required.' });
  }
  // Browser submissions must originate from this deployment or the configured site.
  const origin = req.headers.origin;
  const allowed = [process.env.CONTACT_SITE_URL, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`, process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`].filter(Boolean).map(value => value.replace(/\/$/, ''));
  if (origin && !allowed.includes(origin)) return res.status(403).json({ error: 'Origin not allowed.' });
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('body');
    if (JSON.stringify(body).length > 16000) return res.status(413).json({ error: 'Message is too large.' });
  } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  if (body.website) return res.status(200).json({ ok: true });
  const values = {};
  for (const field of ['name', 'email', 'subject', 'message']) {
    if (typeof body[field] !== 'string') return res.status(400).json({ error: 'Please complete all fields.' });
    values[field] = body[field].trim();
  }
  const { name, email, subject, message } = values;
  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || /[\r\n]/.test(email + name + subject) || !subject || subject.length > 160 || message.length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Check your details. Messages must be 10–5000 characters.' });
  }
  const now = Date.now();
  for (const [key, record] of attempts) if (record.expires <= now) attempts.delete(key);
  const ip = String(req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown');
  const record = attempts.get(ip) || { count: 0, expires: now + windowMs };
  if (record.count >= 5) {
    res.setHeader('Retry-After', String(Math.ceil((record.expires - now) / 1000)));
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }
  if (attempts.size >= 5000 && !attempts.has(ip)) return res.status(429).json({ error: 'Please try again later.' });
  record.count += 1;
  attempts.set(ip, record);
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return res.status(503).json({ error: 'Messaging is temporarily unavailable. Please use the email link.' });
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return res.status(502).json({ error: 'Your message could not be sent. Please try again or use the email link.' });
    const result = await response.json();
    if (!result.id) throw new Error('Missing provider receipt');
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Your message could not be sent. Please try again or use the email link.' });
  }
}
