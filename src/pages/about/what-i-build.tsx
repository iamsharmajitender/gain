import type {ReactNode} from 'react';
import AboutPageLayout from '@site/src/components/AboutPageLayout';

export default function AboutWhatIBuild(): ReactNode {
  return (
    <AboutPageLayout activeHref="/about/what-i-build">
      <h2>What I Build</h2>
      <p>
        I advise and lead architecture for enterprise platforms and AI-enabled systems, currently
        as Enterprise Architect at NAB, with deep prior work in aviation (Emirates), energy
        (AusNet Services), retail (Tesco), and digital transformation consulting (Sapient) across
        banking and enterprise clients in India and the UAE.
      </p>
      <p>
        My work spans cloud modernisation, distributed and event-driven platforms, integration
        architecture, and governed production AI, including GenAI adoption strategy, agent runtimes,
        RAG pipelines, and the observability and policy layers that make AI trustworthy at scale.
      </p>
    </AboutPageLayout>
  );
}
