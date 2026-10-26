import { Phone, MessageCircle, CreditCard } from 'lucide-react';
import { useHeaderConfig } from '../../hooks/useHeaderConfig';
import { useFooterConfig } from '../../hooks/useContent';
import { defaultFooterConfig } from '../../data/defaultCmsContent';
import { MARQUEE_ICONS } from './marqueeIcons';
import { SocialIcon, normalizePlatform } from '../common/SocialIcon';
import type { FooterConfig } from '../../types/cms';

export default function UtilityBar() {
  const { config } = useHeaderConfig();
  const { data: cmsFooter } = useFooterConfig<FooterConfig>();
  const { phone, whatsapp, marqueeEntries, payNowLabel, payNowHref, marqueeSettings } = config;
  const ms = marqueeSettings ?? { enabled: true, autoScroll: true, scrollSpeed: 30, pauseOnHover: true };
  const items = (marqueeEntries ?? []).filter((e) => e.enabled !== false && e.text.trim());
  const loopItems = [...items, ...items];
  const marqueeStyle = ms.autoScroll ? { animationDuration: `${ms.scrollSpeed}s` } as React.CSSProperties : { animation: 'none' };

  // Social icons follow Footer Management so the two never drift apart; fall back to header-level socials.
  const footerSocials = (cmsFooter ?? defaultFooterConfig).socials;
  const socials = footerSocials.some((s) => s.enabled && s.href)
    ? footerSocials.filter((s) => s.enabled && s.href)
    : (config.socials ?? []).filter((s) => s.enabled !== false && s.href);

  return (
    <div className="bg-primary h-9 hidden lg:flex items-center justify-between px-3 md:px-8">
      {/* Zone 1 - Left */}
      <div className="flex items-center gap-4">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-1.5 text-white/95 hover:text-white text-xs font-medium transition-colors"
        >
          <Phone className="w-3 h-3" /> {phone}
        </a>
        <span className="text-white/20">|</span>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-white/95 hover:text-white text-xs font-medium transition-colors"
        >
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </a>
      </div>

      {/* Zone 2 - Center Marquee */}
      {ms.enabled !== false && items.length > 0 && (
        <div className="flex-1 overflow-hidden mx-2 sm:mx-4 h-full flex items-center relative">
          <div
            className={`flex gap-10 whitespace-nowrap utility-marquee absolute left-0 h-full items-center ${ms.pauseOnHover !== false ? '' : 'no-pause'}`}
            style={marqueeStyle}
          >
            {loopItems.map((item, index) => {
              const Icon = item.icon ? MARQUEE_ICONS[item.icon] : undefined;
              const content = (
                <>
                  {Icon && <Icon className="w-3 h-3 shrink-0" />}
                  <span>{item.text}</span>
                </>
              );
              const cls = 'text-white/95 text-[10px] sm:text-xs font-medium flex items-center gap-1.5';
              return (
                <div key={index} className="flex items-center gap-6 sm:gap-10">
                  {item.link ? (
                    <a
                      href={item.link}
                      {...(/^https?:/i.test(item.link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`${cls} hover:text-white hover:underline underline-offset-2`}
                    >
                      {content}
                    </a>
                  ) : (
                    <span className={cls}>{content}</span>
                  )}
                  <span className="text-white/20 select-none">•</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={normalizePlatform(social.platform)}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.platform}
              className="text-white/95 hover:text-white transition-colors"
            >
              <SocialIcon platform={social.platform} className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        <div className="border-r border-white/20 h-4 hidden md:block mx-1"></div>

        <a
          href={payNowHref ?? '/payment'}
          className="relative bg-secondary hover:bg-secondary/90 hover:scale-105 text-white text-[10px] sm:text-[11px] font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 shadow-sm transition-all hover:shadow-md tracking-wide uppercase shrink-0 whitespace-nowrap"
        >
          <CreditCard className="w-3 h-3" />
          {payNowLabel ?? 'Pay Now'}
        </a>
      </div>
    </div>
  );
}
