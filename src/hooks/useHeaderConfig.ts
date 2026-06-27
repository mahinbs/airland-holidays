import { useQuery } from '@tanstack/react-query';
import { headerConfig as staticHeaderConfig } from '../data/paymentConfig';
import { fetchSiteSetting } from '../services/content';
import type { HeaderConfig } from '../types/nav';

export function useHeaderConfig() {
  const query = useQuery({
    queryKey: ['site_setting', 'header_config'],
    queryFn: () => fetchSiteSetting<HeaderConfig>('header_config'),
  });

  const config: HeaderConfig = {
    ...staticHeaderConfig,
    enquireLabel: 'Enquire Now',
    enquireHref: '/contact',
    payNowLabel: 'Pay Now',
    payNowHref: '/payment',
    ...(query.data ?? {}),
  };

  return { config, ...query };
}
