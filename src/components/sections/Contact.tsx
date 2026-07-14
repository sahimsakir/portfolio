import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { personal } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { fadeUp, viewportOnce } from '@/animations/variants';
import type { ContactFormData } from '@/types';
import { sendContactMessage } from '@/services/emailService';
import { createRipple } from '@/utils/helpers';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    try {
      await sendContactMessage(data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, project, or idea in mind? Send a message and I'll get back to you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Card className="h-full space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grad-primary text-white">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs text-ink-faint">email</p>
                  <a href={`mailto:${personal.email}`} className="text-sm text-ink hover:text-accent-indigo">
                    {personal.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grad-primary text-white">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs text-ink-faint">phone</p>
                  <a href={`tel:+88${personal.phone}`} className="text-sm text-ink hover:text-accent-indigo">
                    {personal.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grad-primary text-white">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs text-ink-faint">location</p>
                  <p className="text-sm text-ink">{personal.location}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Card>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-xs text-ink-dim">
                      name
                    </label>
                    <input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent-indigo/60"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-xs text-ink-dim">
                      email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent-indigo/60"
                      placeholder="jane@company.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block font-mono text-xs text-ink-dim">
                    subject
                  </label>
                  <input
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent-indigo/60"
                    placeholder="Role, project, or collaboration"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-xs text-ink-dim">
                    message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message is too short' } })}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent-indigo/60"
                    placeholder="Tell me a bit about what you're building..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  onMouseDown={createRipple}
                  className="btn-gradient ripple w-full sm:w-auto"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-accent-cyan">
                    <CheckCircle2 size={16} /> Message sent — I'll reply soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} /> EmailJS isn't configured yet — add your credentials in
                    src/constants/index.ts.
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
