import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {TYPE_TAG_LABELS} from '@site/src/data/insightTags';
import {latestInsights} from '@site/src/data/latestInsights.generated';

function formatInsightDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00.000Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

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
            {latestInsights.map((item) => (
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
                  <time dateTime={item.date}>{formatInsightDate(item.date)}</time>
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
