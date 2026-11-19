'use client';

import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n';

export default function WhatsAppButton() {
  const { lang } = useLanguage();
  const msg = encodeURIComponent(
    lang === 'es'
      ? 'Hola Richard, vi tu portafolio y me gustaría contactarte.'
      : "Hi Richard, I saw your portfolio and I'd like to get in touch.",
  );

  return (
    <a
      href={`https://wa.me/51936036606?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="bg-chalk text-ink fixed right-4 bottom-4 z-[55] grid h-14 w-14 place-items-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-150 ease-[var(--ease-out-expo)] hover:opacity-85 active:scale-[0.95] sm:right-6 sm:bottom-6"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
