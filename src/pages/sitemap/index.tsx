import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import SitemapSectionBlock from '@site/src/components/SitemapSection';
import {
  getHandbookSection,
  getSiteSection,
  handbookSections,
  sitemapPageHref,
} from '@site/src/data/sitemap';
import {InsightsSitemapTab} from '@site/src/pages/sitemap/insights';
import {sitemapSubtitle, sitemapTabs, type SitemapTabId} from '@site/src/data/sectionNav';
import styles from './sitemap.module.css';

function OverviewTab(): ReactNode {
  return (
    <>
      <p className={styles.lead}>
        One place to see how the handbook fits together: what each section is for, where to start, and
        how the pieces connect.
      </p>

      <section className={styles.overview} aria-labelledby="handbook-overview">
        <h2 id="handbook-overview" className={styles.overviewTitle}>
          How the handbook fits together
        </h2>
        <div className="gain-table-wrap overview-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Question it answers</th>
              </tr>
            </thead>
            <tbody>
              {handbookSections.map((section) => (
                <tr key={section.id}>
                  <td>
                    <Link to={sitemapPageHref(section.id)} className={styles.overviewSectionLink}>
                      {section.title}
                    </Link>
                  </td>
                  <td>{section.question}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <Link to="/sitemap?tab=site" className={styles.overviewSectionLink}>
                    About &amp; Advisory
                  </Link>
                </td>
                <td>Who builds this and how to engage</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.overviewNote}>
          <strong>Rule of thumb:</strong> principles and ownership → G.A.I.N Framework · reference
          designs → Blueprints · operational guides → Playbooks · essays → Insights.
        </p>
      </section>

      <div className={styles.flow} aria-label="Recommended reading flow">
        <div className={styles.flowStep}>Framework: why &amp; who</div>
        <div className={styles.flowArrow} aria-hidden="true">
          →
        </div>
        <div className={styles.flowStep}>Blueprints: reference design</div>
        <div className={styles.flowArrow} aria-hidden="true">
          →
        </div>
        <div className={styles.flowStep}>Playbooks: how to build</div>
        <div className={styles.flowArrow} aria-hidden="true">
          →
        </div>
        <div className={styles.flowStep}>Insights: narrative thinking</div>
      </div>
    </>
  );
}

const sitemapTabContent: Record<SitemapTabId, () => ReactNode> = {
  overview: OverviewTab,
  frameworks: () => <SitemapSectionBlock section={getHandbookSection('frameworks')} />,
  blueprints: () => <SitemapSectionBlock section={getHandbookSection('blueprints')} />,
  playbooks: () => <SitemapSectionBlock section={getHandbookSection('playbooks')} />,
  insights: InsightsSitemapTab,
  site: () => <SitemapSectionBlock section={getSiteSection('site')} />,
};

export default function Sitemap(): ReactNode {
  return (
    <SectionPageLayout
      title="Sitemap"
      subtitle={sitemapSubtitle}
      sectionLabel="Handbook"
      hideNav
    >
      <Tabs queryString="tab" defaultValue="overview" className={styles.sitemapTabs}>
        {sitemapTabs.map((tab) => {
          const TabContent = sitemapTabContent[tab.id];
          return (
            <TabItem key={tab.id} value={tab.id} label={tab.label}>
              <TabContent />
            </TabItem>
          );
        })}
      </Tabs>
    </SectionPageLayout>
  );
}
