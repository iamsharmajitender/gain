import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import SitemapSectionBlock from '@site/src/components/SitemapSection';
import {getSiteSection} from '@site/src/data/sitemap';
import {sitemapNav, sitemapSubtitle} from '@site/src/data/sectionNav';

export default function SitemapSite(): ReactNode {
  return (
    <SectionPageLayout
      title="Sitemap"
      subtitle={sitemapSubtitle}
      sectionLabel="Handbook"
      navItems={sitemapNav}
      activeHref="/sitemap/site"
    >
      <SitemapSectionBlock section={getSiteSection('site')} />
    </SectionPageLayout>
  );
}
