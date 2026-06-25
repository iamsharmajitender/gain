import type {SectionNavItem} from '@site/src/components/SectionPageLayout';

export const aboutSubtitle =
  'Melbourne-based advisor, architect, and technical leader with 18+ years across banking, aviation, and critical infrastructure in Australia, UAE, and India.';

export const advisorySubtitle =
  'Advisory for enterprise architecture, platform modernization, and governed AI.';

export const aboutTabs = [
  {id: 'philosophy', label: 'Philosophy'},
  {id: 'how-i-lead', label: 'How I Lead'},
  {id: 'what-i-build', label: 'What I Build'},
  {id: 'industries', label: 'Industries'},
  {id: 'background', label: 'Background'},
  {id: 'credentials', label: 'Credentials'},
  {id: 'why-this-exists', label: 'Why This Exists'},
] as const;

export type AboutTabId = (typeof aboutTabs)[number]['id'];

/** @deprecated About uses in-page tabs; use `/about?tab=<id>` instead. */
export const aboutNav: SectionNavItem[] = aboutTabs.map((tab) => ({
  label: tab.label,
  href: tab.id === 'philosophy' ? '/about' : `/about?tab=${tab.id}`,
}));

export const advisoryTabs = [
  {id: 'services', label: 'Services'},
  {id: 'approach', label: 'Approach'},
  {id: 'case-studies', label: 'Case Studies'},
  {id: 'engagement', label: 'Engagement'},
  {id: 'contact', label: 'Contact'},
] as const;

export type AdvisoryTabId = (typeof advisoryTabs)[number]['id'];

/** @deprecated Advisory uses in-page tabs; use `/advisory?tab=<id>` instead. */
export const advisoryNav: SectionNavItem[] = advisoryTabs.map((tab) => ({
  label: tab.label,
  href: tab.id === 'services' ? '/advisory' : `/advisory?tab=${tab.id}`,
}));

export const sitemapSubtitle =
  'How the handbook is organized: what each section covers and where to start.';

export const sitemapTabs = [
  {id: 'overview', label: 'Overview'},
  {id: 'frameworks', label: 'G.A.I.N Framework'},
  {id: 'blueprints', label: 'Blueprints'},
  {id: 'architecture', label: 'Architecture'},
  {id: 'playbooks', label: 'Playbooks'},
  {id: 'insights', label: 'Insights'},
  {id: 'site', label: 'About & Advisory'},
] as const;

export type SitemapTabId = (typeof sitemapTabs)[number]['id'];

/** @deprecated Sitemap uses in-page tabs; use `/sitemap?tab=<id>` instead. */
export const sitemapNav: SectionNavItem[] = sitemapTabs.map((tab) => ({
  label: tab.label,
  href: tab.id === 'overview' ? '/sitemap' : `/sitemap?tab=${tab.id}`,
}));
