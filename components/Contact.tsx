'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { cn } from '@/utils/cn';
import { validateEmail, validateName, validateMessage } from '@/utils/validation';
import { BigTitle, EASE, Reveal } from './ui';

const DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'protonmail.com',
];

const fieldBase =
  'w-full border-0 border-b bg-transparent py-4 text-xl text-chalk placeholder:text-chalk-soft/70 transition-colors duration-150 focus:border-flare focus:outline-none md:text-2xl';

export default function Contact() {
  const { t, lang } = useLanguage();
  const es = lang === 'es';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const nameValid = name ? validateName(name) : undefined;
  const emailValid = email ? validateEmail(email) : undefined;
  const messageValid = message ? validateMessage(message) : undefined;
  const allValid = validateName(name) && validateEmail(email) && validateMessage(message);

  const at = email.indexOf('@');
  const typed = at !== -1 ? email.slice(at + 1).toLowerCase() : '';
  const suggestions =
    at !== -1 && !DOMAINS.includes(typed)
      ? DOMAINS.filter((d) => d.startsWith(typed)).slice(0, 4)
      : [];

  function done() {
    setSending(false);
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
  }

  function fallbackMailto() {
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
    done();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!allValid || sending) return;
    setSending(true);

    fetch('https://formspree.io/f/mnjendgz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => (res.ok ? done() : fallbackMailto()))
      .catch(fallbackMailto);
  }

  const hint = (ok: boolean | undefined, text: string) =>
    ok === false ? <p className="text-flare pt-2 text-sm">{text}</p> : null;

  return (
    <section
      id="contact"
      className="bg-ground-deep px-5 pt-24 pb-12 sm:px-8 md:px-12 md:pt-40 md:pb-16"
    >
      <p className="text-chalk-soft mb-6 max-w-[32ch] text-lg md:text-xl">
        {t.contact.description}
      </p>
      <BigTitle className="text-[21vw] md:text-[16vw]">{t.contact.headline}</BigTitle>

      <Reveal>
        <a
          href={`mailto:${t.contact.email}`}
          className="decoration-flare mt-6 inline-flex min-h-12 items-center gap-2 text-xl font-semibold break-all underline decoration-2 underline-offset-[0.3em] md:text-3xl"
        >
          {t.contact.email}
          <ArrowUpRight aria-hidden="true" className="shrink-0" />
        </a>
      </Reveal>

      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div className="min-h-[24rem]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <m.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="name" className="sr-only">
                    {t.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.form.name}
                    className={cn(fieldBase, nameValid === false ? 'border-flare' : 'hairline')}
                  />
                  {hint(nameValid, es ? 'Mínimo 2 caracteres' : 'At least 2 characters')}
                </div>

                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    {t.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contact.form.email}
                    className={cn(fieldBase, emailValid === false ? 'border-flare' : 'hairline')}
                  />
                  {hint(emailValid, es ? 'Formato de correo inválido' : 'Invalid email format')}
                  {suggestions.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pt-3">
                      {suggestions.map((d) => (
                        <li key={d}>
                          <button
                            type="button"
                            onClick={() => setEmail(email.slice(0, at + 1) + d)}
                            className="hairline hover:bg-chalk/10 min-h-11 rounded-full border px-4 text-sm transition-colors"
                          >
                            @{d}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.form.message}
                    className={cn(
                      fieldBase,
                      'resize-none',
                      messageValid === false ? 'border-flare' : 'hairline',
                    )}
                  />
                  {hint(messageValid, es ? 'Mínimo 10 caracteres' : 'At least 10 characters')}
                </div>

                <button
                  type="submit"
                  disabled={!allValid || sending}
                  className={cn(
                    'mt-4 inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-8 text-base font-semibold transition-[transform,background-color,opacity] duration-150 ease-[var(--ease-out-expo)] md:self-start',
                    allValid && !sending
                      ? 'bg-chalk text-ink hover:opacity-85 active:scale-[0.97]'
                      : 'hairline text-chalk-soft border',
                  )}
                >
                  {sending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      {es ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {t.contact.form.send}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </m.form>
            ) : (
              <m.div
                key="ok"
                role="status"
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h3 className="display text-[14vw] md:text-[6vw]">
                  {es ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>
                <p className="text-chalk-soft max-w-[36ch] text-lg">
                  {es
                    ? 'Gracias por escribirme. Me pondré en contacto contigo lo antes posible.'
                    : "Thank you for writing. I'll get back to you as soon as possible."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="hairline hover:bg-chalk/10 inline-flex min-h-12 items-center self-start rounded-full border px-6 text-sm font-semibold transition-colors"
                >
                  {es ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <dl className="flex flex-col gap-8 text-lg">
          <div>
            <dt className="text-chalk-soft mb-1 text-sm">WhatsApp</dt>
            <dd>
              <a
                href={`https://wa.me/${t.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-chalk-soft hover:decoration-flare inline-flex min-h-11 items-center text-2xl font-semibold underline underline-offset-4"
              >
                {t.contact.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-chalk-soft mb-1 text-sm">{es ? 'Ubicación' : 'Location'}</dt>
            <dd className="text-2xl font-semibold">{t.hero.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
