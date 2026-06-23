import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {advisoryNav, advisorySubtitle} from '@site/src/data/sectionNav';

export default function AdvisoryEngagement(): ReactNode {
  return (
    <SectionPageLayout
      title="Advisory"
      subtitle={advisorySubtitle}
      sectionLabel="Advisory"
      navItems={advisoryNav}
      activeHref="/advisory/engagement"
    >
      <h2>Engagement</h2>
      <ul>
        <li>
          <strong>Architecture reviews</strong>: structured assessment with actionable recommendations
        </li>
        <li>
          <strong>Strategy workshops</strong>: align stakeholders on target architecture and roadmap
        </li>
        <li>
          <strong>Fractional leadership</strong>: hands-on guidance during transformation programs
        </li>
        <li>
          <strong>Design authority</strong>: ongoing advisory for architecture decisions and governance
        </li>
      </ul>
    </SectionPageLayout>
  );
}
