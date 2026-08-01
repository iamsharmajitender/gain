import {useEffect, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';
import type {AboutTabId} from '@site/src/data/sectionNav';

function AboutTabRedirect({tab}: {tab: AboutTabId}): ReactNode {
  const history = useHistory();

  useEffect(() => {
    history.replace(tab === 'about' ? '/about' : `/about?tab=${tab}`);
  }, [history, tab]);

  return null;
}

export function AboutHowILeadRedirect(): ReactNode {
  return <AboutTabRedirect tab="about" />;
}

export function AboutWhatIBuildRedirect(): ReactNode {
  return <AboutTabRedirect tab="work" />;
}

export function AboutIndustriesRedirect(): ReactNode {
  return <AboutTabRedirect tab="work" />;
}

export function AboutCareerHighlightsRedirect(): ReactNode {
  return <AboutTabRedirect tab="background" />;
}

export function AboutBackgroundRedirect(): ReactNode {
  return <AboutTabRedirect tab="background" />;
}

export function AboutCredentialsRedirect(): ReactNode {
  return <AboutTabRedirect tab="credentials" />;
}

export function AboutWhyThisExistsRedirect(): ReactNode {
  return <AboutTabRedirect tab="about" />;
}
