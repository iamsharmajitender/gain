import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {TYPE_TAG_LABELS, type TypeTagId} from '@site/src/data/insightTags';

const posts: {
  title: string;
  date: string;
  readTime: number;
  description: string;
  typeTag: TypeTagId;
  to: string;
}[] = [
  {
    title: 'PGAR with RAG',
    date: 'Jul 10, 2026',
    readTime: 10,
    description:
      'Retrieval is not a database query; it is a governed action. How PGAR applies when context construction must be scoped, auditable, and enforced before inference.',
    typeTag: 'arch',
    to: '/insights/retrieval-is-a-governed-action',
  },
  {
    title: 'Policy-Governed Agent Runtime',
    date: 'Jun 25, 2026',
    readTime: 12,
    description:
      'Agents propose tool calls. Governance decides whether they run. Runtime trust boundaries for production agent systems in regulated industries.',
    typeTag: 'arch',
    to: '/insights/policy-governed-agent-runtime',
  },
  {
    title: 'What AI Observability Looks Like in Enterprise',
    date: 'Jun 18, 2026',
    readTime: 5,
    description:
      'AI observability is not a dashboard. It is a capture-and-retention architecture with five signals, five retention policies, and four consumers.',
    typeTag: 'exp',
    to: '/insights/ai-observability-in-enterprise',
  },
  {
    title: 'Hallucinations Is a System Design Problem, Not a Model Problem',
    date: 'Jun 16, 2026',
    readTime: 6,
    description:
      'Hallucination is not the model failing. It is the model succeeding at the wrong objective in a system that never gave it the right one.',
    typeTag: 'pov',
    to: '/insights/hallucinations-is-a-system-design-problem-not-model-problem',
  },
  {
    title: 'How LLM Works Under the Hood',
    date: 'Jun 9, 2026',
    readTime: 8,
    description:
      'A 20,000-ft view of the LLM lifecycle and why understanding the four stages matters for enterprise architecture.',
    typeTag: 'lrn',
    to: '/insights/how-llm-works-under-the-hood',
  },
];

export default function HomepageBottom(): ReactNode {
  return (
    <section className="gain-home-bottom">
      <div className="container">
        <section className="gain-latest-insights">
          <div className="gain-latest-insights__header">
            <div className="gain-latest-insights__intro">
              <h2>Latest Insights</h2>
              <p>
                Fresh perspectives, architecture deep-dives, and lessons from building AI systems.
              </p>
            </div>
            <Link to="/insights" className="gain-latest-insights__view-all">
              View all insights →
            </Link>
          </div>
          <div className="gain-latest-insights__grid">
            {posts.map((item) => (
              <Link key={item.to} to={item.to} className="gain-latest-insights__card">
                <span
                  className={clsx(
                    'gain-latest-insights__tag',
                    `gain-latest-insights__tag--${item.typeTag}`,
                  )}>
                  {TYPE_TAG_LABELS[item.typeTag]}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <footer>
                  <time>{item.date}</time>
                  <span aria-hidden="true"> • </span>
                  <span>{item.readTime} min read</span>
                </footer>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
