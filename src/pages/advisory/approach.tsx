import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {advisoryNav, advisorySubtitle} from '@site/src/data/sectionNav';

export default function AdvisoryApproach(): ReactNode {
  return (
    <SectionPageLayout
      title="Advisory"
      subtitle={advisorySubtitle}
      sectionLabel="Advisory"
      navItems={advisoryNav}
      activeHref="/advisory/approach"
    >
      <h2>Approach</h2>
      <p>
        I work from first principles: understanding the business problem, constraints, and success
        criteria before defining architecture. Every engagement balances speed with governance,
        especially in regulated environments.
      </p>
      <ul>
        <li>Start with the problem, not the technology</li>
        <li>Design for evolution, not just delivery</li>
        <li>Embed observability and governance from day one</li>
        <li>Enable teams through clarity, patterns, and standards</li>
        <li>Build in public: share patterns and lessons that accelerate outcomes</li>
      </ul>
    </SectionPageLayout>
  );
}
