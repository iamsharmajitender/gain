import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const pillars = [
  {
    icon: '⬡',
    title: 'Strategy & Architecture',
    description: 'Roadmaps, reference models, and design authority for enterprise transformation.',
    tag: 'system-architecture',
    color: 'blue',
  },
  {
    icon: '⚙',
    title: 'Platforms & Engineering',
    description: 'Cloud-native, event-driven, and observable systems that scale.',
    tag: 'platforms-engineering',
    color: 'purple',
  },
  {
    icon: '◈',
    title: 'AI & Intelligence',
    description: 'Governed agents, RAG, and production AI on enterprise foundations.',
    tag: 'ai-intelligence',
    color: 'green',
  },
  {
    icon: '⛊',
    title: 'Governance & Trust',
    description: 'Policy, compliance, and operational resilience in regulated environments.',
    tag: 'governance-trust',
    color: 'orange',
  },
] as const;

export default function HomepagePillars(): ReactNode {
  return (
    <section className="gain-home-pillars">
      <div className="container">
        <div className="gain-home-pillars__header">
          <div className="gain-home-pillars__intro">
            <h2>Core Domains</h2>
            <p>
              Where I lead. Every domain is built through the G.A.I.N operating model.
            </p>
          </div>
        </div>
        <div className="gain-home-pillars__grid">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              to={`/insights/tags/${pillar.tag}`}
              className={clsx('gain-home-pillar', `gain-home-pillar--${pillar.color}`)}>
              <div className="gain-home-pillar__icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <span className="gain-home-pillar__link">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
