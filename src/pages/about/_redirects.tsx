import {useEffect, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';

function AboutTabRedirect({tab}: {tab: string}): ReactNode {
  const history = useHistory();

  useEffect(() => {
    history.replace(`/about?tab=${tab}`);
  }, [history, tab]);

  return null;
}

export function AboutHowILeadRedirect(): ReactNode {
  return <AboutTabRedirect tab="how-i-lead" />;
}

export function AboutWhatIBuildRedirect(): ReactNode {
  return <AboutTabRedirect tab="what-i-build" />;
}

export function AboutIndustriesRedirect(): ReactNode {
  return <AboutTabRedirect tab="industries" />;
}

export function AboutBackgroundRedirect(): ReactNode {
  return <AboutTabRedirect tab="background" />;
}

export function AboutCredentialsRedirect(): ReactNode {
  return <AboutTabRedirect tab="credentials" />;
}

export function AboutWhyThisExistsRedirect(): ReactNode {
  return <AboutTabRedirect tab="why-this-exists" />;
}
