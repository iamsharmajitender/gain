import type {ReactNode} from 'react';
import AboutPageLayout from '@site/src/components/AboutPageLayout';

export default function AboutHowILead(): ReactNode {
  return (
    <AboutPageLayout activeHref="/about/how-i-lead">
      <h2>How I Lead</h2>
      <p>
        I lead through design authority and operating models, not engineering people management.
      </p>
      <ul>
        <li>Set technical direction and reference architectures across delivery streams</li>
        <li>Partner with business and executive stakeholders on roadmaps and tradeoffs</li>
        <li>Establish standards, architecture review boards, COEs, and governance frameworks</li>
        <li>Shape AI and platform adoption strategies that hold up in production</li>
        <li>Enable teams through patterns, playbooks, and clear decision frameworks</li>
      </ul>
      <p>
        This is the work I do in enterprise architecture, and what I write about publicly.
      </p>
    </AboutPageLayout>
  );
}
