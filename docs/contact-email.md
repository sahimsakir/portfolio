# Contact email setup (Vercel + Resend)

The React form POSTs to `/api/contact`. The Vercel Node.js function validates fields, uses a honeypot and a bounded per-instance IP throttle, then sends a plain-text email through Resend. Recipient and credentials come exclusively from server environment variables. The visitor is set as Reply-To, never as the sender. Provider errors do not produce a success state or clear the message.

## Activate delivery

1. Create a Resend account at https://resend.com and verify a sending domain you control. Follow its DNS setup; use a sender on that verified domain. Resend's test sender is restricted and is not a production sender.
2. Create a sending API key and add these variables in **Vercel → portfolio → Settings → Environment Variables** for the environments you will use:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your private Resend sending key |
| `CONTACT_FROM_EMAIL` | `Sahim Portfolio <contact@YOUR_VERIFIED_DOMAIN>` |
| `CONTACT_TO_EMAIL` | Your destination inbox (the same address displayed on the portfolio) |
| `CONTACT_SITE_URL` | Exact public site origin, e.g. `https://sahim.dev` |

Do not use a `VITE_` prefix for any email credential. Do not commit credentials or paste the API key into chat. Deployment-specific Vercel origins are also accepted through Vercel system variables. Use the exact canonical site origin for CONTACT_SITE_URL; if your site redirects www, submit from the canonical origin.

3. Merge the contact-email PR and redeploy after adding the variables. Ensure the Vercel project builds from the repository root so `/api/contact.js` is deployed as a function. There is no need to configure an external backend or EmailJS.
4. Submit the form using an email address you control. Confirm the message arrives in your inbox (check spam), and verify that replying addresses the visitor. A provider acceptance response is not proof of inbox delivery; check the Resend delivery logs if needed.

## Local validation

```sh
node --test tests/contact.test.mjs
npm run build
npm run lint
```

Tests mock the provider; no email is sent. Plain `vite dev` and `vite preview` do not run Vercel Functions. For end-to-end local testing, run `vercel dev` with the server environment variables configured. Do not put API keys in frontend environment files.

## Abuse protection

The honeypot, request-size limits, field validation and per-instance throttle provide basic filtering. Origin checks block ordinary cross-origin browser submissions, but are not bot authentication. The throttle is not shared across instances and resets on cold starts. Configure Vercel WAF rate limiting for `/api/contact` before exposing the form to sustained public traffic. The endpoint can email only the server-configured inbox and never accepts a recipient from the browser.

References: https://resend.com/docs/api-reference/emails/send-email and https://vercel.com/docs/functions/runtimes/node-js
