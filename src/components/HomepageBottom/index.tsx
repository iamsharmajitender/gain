import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {TYPE_TAG_LABELS} from '@site/src/data/insightTags';
import {
  latestInsightsByTab,
  type InsightTabId,
  type LatestInsight,
} from '@site/src/data/latestInsights.generated';

const TABS: readonly {id: InsightTabId; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'system-design', label: 'System Design'},
  {id: 'under-the-hood', label: 'Under the Hood'},
];

function formatInsightDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00.000Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function InsightCard({item}: {item: LatestInsight}): ReactNode {
  return (
    <Link to={item.to} className="gain-latest-insights__card">
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
  );
}

export default function HomepageBottom(): ReactNode {
  // Only surface tabs that actually have cards, but always keep "All".
  const availableTabs = TABS.filter(
    (tab) => tab.id === 'all' || (latestInsightsByTab[tab.id]?.length ?? 0) > 0,
  );
  const [activeTab, setActiveTab] = useState<InsightTabId>('all');
  // Render only the active tab's cards; other tabs mount on demand when selected.
  const activeItems = latestInsightsByTab[activeTab] ?? [];

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
          <div
            className="gain-latest-insights__tabs"
            role="tablist"
            aria-label="Latest insights categories">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`gain-insights-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`gain-insights-panel-${tab.id}`}
                className={clsx(
                  'gain-latest-insights__tab',
                  activeTab === tab.id && 'gain-latest-insights__tab--active',
                )}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className="gain-latest-insights__grid"
            role="tabpanel"
            id={`gain-insights-panel-${activeTab}`}
            aria-labelledby={`gain-insights-tab-${activeTab}`}>
            {activeItems.map((item) => (
              <InsightCard key={item.to} item={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
