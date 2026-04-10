import { Phone, MessageCircle, CreditCard, Facebook, Youtube, Instagram } from 'lucide-react';
import { headerConfig } from '../../data/paymentConfig';

export default function UtilityBar() {
  const { phone, whatsapp, socials, marqueeItems } = headerConfig;
  const loopItems = [...marqueeItems, ...marqueeItems];

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-3.5 h-3.5 text-white/60 hover:text-white transition-colors" />;
      case 'Facebook': return <Facebook className="w-3.5 h-3.5 text-white/60 hover:text-white transition-colors" />;
      case 'Youtube': return <Youtube className="w-3.5 h-3.5 text-white/60 hover:text-white transition-colors" />;
      default: return null;
    }
  };

  return (
    <div className="bg-slate-900 h-9 hidden lg:flex items-center justify-between px-3 md:px-8">
      {/* Zone 1 - Left */}
      <div className="flex items-center gap-4">
        <a 
          href={`tel:${phone}`} 
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium transition-colors"
        >
          <Phone className="w-3 h-3" /> {phone}
        </a>
        <span className="text-white/20">|</span>
        <a 
          href={`https://wa.me/${whatsapp}`} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium transition-colors"
        >
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </a>
      </div>

      {/* Zone 2 - Center Marquee */}
      <div className="flex-1 overflow-hidden mx-2 sm:mx-4 h-full flex items-center relative">
        <div className="flex gap-10 whitespace-nowrap utility-marquee absolute left-0 h-full items-center">
          {loopItems.map((item, index) => (
            <div key={index} className="flex items-center gap-6 sm:gap-10">
              <span className="text-white/70 text-[10px] sm:text-xs font-medium">{item}</span>
              <span className="text-white/20 select-none">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zone 3 - Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex items-center gap-2">
          {socials.map((social) => (
            <a 
              key={social.platform} 
              href={social.href} 
              target="_blank" 
              rel="noreferrer"
              aria-label={social.platform}
            >
              {getIcon(social.platform)}
            </a>
          ))}
        </div>
        
        <div className="border-r border-white/20 h-4 hidden md:block mx-1"></div>
        
        <a
          href="/payment"
          className="relative bg-secondary hover:bg-secondary/90 hover:scale-105 text-white text-[10px] sm:text-[11px] font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 shadow-sm transition-all hover:shadow-md tracking-wide uppercase shrink-0 whitespace-nowrap"
        >
          <CreditCard className="w-3 h-3" />
          Pay Now
        </a>
      </div>
    </div>
  );
}
