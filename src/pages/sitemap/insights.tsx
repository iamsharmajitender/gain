import type {ReactNode} from 'react';
import SitemapSectionBlock from '@site/src/components/SitemapSection';
import {getHandbookSection} from '@site/src/data/sitemap';
import {SitemapInsightsRedirect} from './_redirects';

export function InsightsSitemapTab(): ReactNode {
  return <SitemapSectionBlock section={getHandbookSection('insights')} />;
}

export default SitemapInsightsRedirect;
