import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import SitemapSectionBlock from '@site/src/components/SitemapSection';
import {getHandbookSection} from '@site/src/data/sitemap';
import {sitemapNav, sitemapSubtitle} from '@site/src/data/sectionNav';

export default function SitemapPlaybooks(): ReactNode {
  return (
    <SectionPageLayout
      title="Sitemap"
      subtitle={sitemapSubtitle}
      sectionLabel="Handbook"
      navItems={sitemapNav}
      activeHref="/sitemap/playbooks"
    >
      <SitemapSectionBlock section={getHandbookSection('playbooks')} />
    </SectionPageLayout>
  );
}
