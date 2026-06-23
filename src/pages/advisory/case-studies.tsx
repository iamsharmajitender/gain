import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {advisoryNav, advisorySubtitle} from '@site/src/data/sectionNav';

export default function AdvisoryCaseStudies(): ReactNode {
  return (
    <SectionPageLayout
      title="Advisory"
      subtitle={advisorySubtitle}
      sectionLabel="Advisory"
      navItems={advisoryNav}
      activeHref="/advisory/case-studies"
    >
      <h2>Case Studies</h2>
      <p>
        Engagements across banking, aviation, and critical infrastructure: cloud modernization,
        platform design, and governed AI adoption at scale.
      </p>
      <p>
        Detailed case studies available on request. Reach out to discuss relevant experience for your
        organization.
      </p>
    </SectionPageLayout>
  );
}
