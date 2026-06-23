import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from '../styles.module.css';

type Props = {
  className?: string;
};

const aiLogs = [
  '> booting retrieval agent...',
  '> scanning /insights/tags/* ... 0 embeddings matched',
  '> confidence: 0.03 — below abstention threshold',
  '> reranking candidates... still nothing',
  '> invoking fallback: "maybe it moved?"',
  '> querying vector store (attempt 12)...',
  '> hallucinating plausible URL... rejected by PEP',
  '> policy verdict: DENY — page does not exist',
  '> spawning background worker to keep looking anyway',
  '> still searching the vector store...',
];

function AiBackgroundFeed(): ReactNode {
  const stream = [...aiLogs, ...aiLogs];

  return (
    <div className={styles.aiFeed} aria-hidden>
      <div className={styles.aiFeedHeader}>
        <span className={styles.aiFeedDot} />
        <span className={styles.aiFeedDot} />
        <span className={styles.aiFeedDot} />
        <span>agent-runtime.log</span>
      </div>
      <div className={styles.aiFeedBody}>
        <div className={styles.aiFeedScroll}>
          {stream.map((line, index) => (
            <div key={index} className={styles.aiFeedLine}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx(styles.notFound, className)}>
      <AiBackgroundFeed />

      <div className={styles.content}>
        <p className={styles.code}>404</p>

        <Heading as="h1" className={styles.title}>
          This page left the building.
        </Heading>

        <p className={styles.lead}>
          We asked the agent to find it. The agent asked the LLM. The LLM was
          very confident about a URL that does not exist. Classic.
        </p>

        <div className={styles.imageWrap}>
          <img
            src="/img/404-ai-searching.png"
            alt="An AI assistant searching through servers and file folders"
            className={styles.image}
            loading="eager"
          />
        </div>

        <p className={styles.status}>
          <span className={styles.statusPulse} aria-hidden />
          AI still working in the background. Do not refresh — that only spawns
          another agent.
        </p>

        <div className={styles.actions}>
          <Link className="gain-btn-primary" to="/">
            Take me home
          </Link>
          <Link className="gain-btn-outline" to="/insights">
            Read Insights instead
          </Link>
        </div>

        <p className={styles.footnote}>
          If you followed a link here, tell the person who sent it their
          architecture diagram may need a governance review.
        </p>
      </div>
    </main>
  );
}
