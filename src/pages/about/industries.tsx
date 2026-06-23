import type {ReactNode} from 'react';
import AboutPageLayout from '@site/src/components/AboutPageLayout';

export default function AboutIndustries(): ReactNode {
  return (
    <AboutPageLayout activeHref="/about/industries">
      <h2>Industries</h2>
      <p>
        Deep experience in regulated, mission-critical environments where architecture, governance,
        and operational resilience are non-negotiable.
      </p>
      <p>I work across regulated and mission-critical domains, including:</p>
      <ul>
        <li>Banking & financial services: core banking, payments, digital channels</li>
        <li>Aviation: global customer and operations platforms</li>
        <li>Critical infrastructure & energy: mission-critical utility services</li>
        <li>Retail & enterprise platforms: large-scale distributed systems</li>
      </ul>
      <p>
        Based in Melbourne, with delivery experience across Australia, the UAE, and India.
      </p>
    </AboutPageLayout>
  );
}
