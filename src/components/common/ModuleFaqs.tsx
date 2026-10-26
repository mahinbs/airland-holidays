import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useModuleFaqs } from '../../hooks/useContent';
import RichContent from './RichContent';

type FaqModule = Parameters<typeof useModuleFaqs>[0];

/** FAQ accordion fed by the central CMS FAQ module — only FAQs assigned to `module` are shown. Hides itself when empty. */
export default function ModuleFaqs({ module, title = 'Frequently Asked Questions', className = '' }: { module: FaqModule; title?: string; className?: string }) {
  const { faqs } = useModuleFaqs(module);
  const [open, setOpen] = useState<string | null>(null);
  if (!faqs.length) return null;

  return (
    <section className={`max-w-4xl mx-auto px-4 sm:px-6 py-12 ${className}`} aria-label={title}>
      <h2 className="text-3xl font-['Marcellus'] text-primary mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = open === faq.id;
          return (
            <div key={faq.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <RichContent html={faq.answer} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
