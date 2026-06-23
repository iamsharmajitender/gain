import type {ReactNode} from 'react';
import AboutPageLayout from '@site/src/components/AboutPageLayout';

export default function AboutWhyThisExists(): ReactNode {
  return (
    <AboutPageLayout activeHref="/about/why-this-exists">
      <h2>Why This Exists</h2>
      <p>
        This site is where I build in public: frameworks, architecture notes, playbooks, blueprints,
        and insights from 18+ years of enterprise architecture work.
      </p>
      <p>
        I publish for architects, engineering leaders, and transformation teams navigating AI and
        platform modernization. If my perspective resonates, Advisory is how we work together;
        Insights is how I share what I learn.
      </p>
    </AboutPageLayout>
  );
}
