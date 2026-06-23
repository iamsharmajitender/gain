import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageGainSystem from '@site/src/components/HomepageGainSystem';
import HomepagePillars from '@site/src/components/HomepagePillars';
import HomepageBottom from '@site/src/components/HomepageBottom';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Advisor and technical leader with 18+ years in enterprise architecture across banking, aviation, cloud modernization, and governed production AI. Building in public at jitendersharma.dev.">
      <header className="gain-hero">
        <div className="container">
          <h1 className="gain-hero__title">
            Advisor and technical leader for enterprise platforms and AI.
          </h1>
          <p className="gain-hero__subtitle">
            18+ years leading architecture in banking, aviation, and regulated enterprise, from
            cloud modernization and distributed systems to governed agents, RAG, and production AI.
            G.A.I.N (Governed AI-Native Systems) is the operating model I use to align strategy,
            architecture, and delivery.
          </p>
          <div className="gain-hero__buttons">
            <Link className="gain-btn-primary" to="/insights">
              Latest Insights
            </Link>
            <Link className="gain-btn-outline" to="/advisory">
              Advisory
            </Link>
          </div>
          <p className="gain-hero__footnote">
            <Link to="/frameworks">Explore the G.A.I.N Framework →</Link>
          </p>
        </div>
      </header>
      <main>
        <HomepageGainSystem />
        <HomepagePillars />
        <HomepageBottom />
      </main>
    </Layout>
  );
}
