import { useMemo } from 'react';
import { navStructure as staticNav } from '../data/navConfig';
import { buildServiceNavItems } from '../lib/servicesCms';
import { useNavConfig, useServices } from './useContent';

export function useSiteNav() {
  const { data: navRow } = useNavConfig();
  const { data: cmsServices } = useServices();

  const serviceLinks = useMemo(() => buildServiceNavItems(cmsServices), [cmsServices]);

  const nav = useMemo(() => {
    const base = Array.isArray(navRow?.structure)
      ? (navRow.structure as typeof staticNav)
      : staticNav;

    return base.map((item) => {
      if (item.label === 'Services' && item.type === 'dropdown') {
        return { ...item, items: serviceLinks };
      }
      return item;
    });
  }, [navRow, serviceLinks]);

  return { nav, serviceLinks };
}
