import type {ReactNode} from 'react';
import AboutPageLayout from '@site/src/components/AboutPageLayout';

export default function AboutPhilosophy(): ReactNode {
  return (
    <AboutPageLayout activeHref="/about">
      <h2>Philosophy</h2>
      <p>
        I believe AI systems should be grounded in truth, designed for adaptivity, and built with
        responsibility.
      </p>
      <p>
        Great architecture is not just about systems. It is about enabling change safely at scale.
        I start with first principles, prefer simplicity over complexity, and design for scale rather
        than exceptions.
      </p>
      <p>
        I lead at the intersection of business strategy, platform architecture, and AI capability,
        helping organisations modernise safely in regulated environments across Australia, the UAE,
        and India.
      </p>
      <p>
        Today that work spans enterprise cloud and application modernisation at NAB, multi-cloud
        platforms (AWS and Azure), and responsible GenAI adoption: setting direction, standards,
        and roadmaps with senior stakeholders, and enabling teams through patterns, governance, and
        architecture boards.
      </p>
    </AboutPageLayout>
  );
}
