import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/constants';
import type { ContactFormData } from '@/types';

export async function sendContactMessage(data: ContactFormData): Promise<void> {
  const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

  if (
    serviceId.startsWith('PLACEHOLDER') ||
    templateId.startsWith('PLACEHOLDER') ||
    publicKey.startsWith('PLACEHOLDER')
  ) {
    // eslint-disable-next-line no-console
    console.warn('EmailJS is not configured. Update src/constants/index.ts with real credentials.');
    throw new Error('EmailJS not configured');
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    },
    { publicKey }
  );
}
