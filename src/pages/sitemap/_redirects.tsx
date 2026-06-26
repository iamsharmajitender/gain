import {useEffect, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';

function SitemapTabRedirect({tab}: {tab: string}): ReactNode {
  const history = useHistory();

  useEffect(() => {
    history.replace(`/sitemap?tab=${tab}`);
  }, [history, tab]);

  return null;
}

export function SitemapFrameworksRedirect(): ReactNode {
  return <SitemapTabRedirect tab="frameworks" />;
}

export function SitemapInsightsRedirect(): ReactNode {
  return <SitemapTabRedirect tab="insights" />;
}

export function SitemapSiteRedirect(): ReactNode {
  return <SitemapTabRedirect tab="site" />;
}
