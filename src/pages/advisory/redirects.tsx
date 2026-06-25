import {useEffect, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';

type AdvisoryRedirectProps = {
  tab: string;
};

function AdvisoryTabRedirect({tab}: AdvisoryRedirectProps): ReactNode {
  const history = useHistory();

  useEffect(() => {
    history.replace(`/advisory?tab=${tab}`);
  }, [history, tab]);

  return null;
}

export function AdvisoryApproachRedirect(): ReactNode {
  return <AdvisoryTabRedirect tab="approach" />;
}

export function AdvisoryCaseStudiesRedirect(): ReactNode {
  return <AdvisoryTabRedirect tab="case-studies" />;
}

export function AdvisoryEngagementRedirect(): ReactNode {
  return <AdvisoryTabRedirect tab="engagement" />;
}

export function AdvisoryContactRedirect(): ReactNode {
  return <AdvisoryTabRedirect tab="contact" />;
}
