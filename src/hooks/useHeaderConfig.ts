import { useQuery } from '@tanstack/react-query';
import { headerConfig as staticHeaderConfig } from '../data/paymentConfig';
import { fetchSiteSetting } from '../services/content';
import { resolveMarqueeEntries } from '../lib/headerMarquee';
import type { HeaderConfig } from '../types/nav';

export function useHeaderConfig() {
  const query = useQuery({
    queryKey: ['site_setting', 'header_config'],
    queryFn: () => fetchSiteSetting<HeaderConfig>('header_config'),
  });

  const merged: HeaderConfig = {
    ...(staticHeaderConfig as HeaderConfig),
    enquireLabel: 'Enquire Now',
    enquireHref: '/contact',
    payNowLabel: 'Pay Now',
    payNowHref: '/payment',
    ...(query.data ?? {}),
  };
  // CMS rows saved before structured marquee items existed only carry `marqueeItems` strings.
  const config: HeaderConfig = { ...merged, marqueeEntries: resolveMarqueeEntries(merged) };

  return { config, ...query };
}
