import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {handbookSections, sitemapPageHref} from '@site/src/data/sitemap';
import {sitemapNav, sitemapSubtitle} from '@site/src/data/sectionNav';
import styles from './sitemap.module.css';

export default function Sitemap(): ReactNode {
  return (
    <SectionPageLayout
      title="Sitemap"
      subtitle={sitemapSubtitle}
      sectionLabel="Handbook"
      navItems={sitemapNav}
      activeHref="/sitemap"
    >
      <p className={styles.lead}>
        One place to see how the handbook fits together: what each section is for, where to start,
        and how the pieces connect.
      </p>

      <section className={styles.overview} aria-labelledby="handbook-overview">
        <h2 id="handbook-overview" className={styles.overviewTitle}>
          How the handbook fits together
        </h2>
        <div className={styles.overviewTableWrap}>
          <table className={styles.overviewTable}>
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
                  <Link to="/sitemap/site" className={styles.overviewSectionLink}>
                    About &amp; Advisory
                  </Link>
                </td>
                <td>Who builds this and how to engage</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.overviewNote}>
          <strong>Rule of thumb:</strong> principles and ownership → Framework · G.A.I.N AI diagrams
          → Blueprints · platform patterns (APIs, events, distributed design) → Architecture ·
          staged build paths → Playbooks · essays and field lessons → Insights.
        </p>
      </section>

      <div className={styles.flow} aria-label="Recommended reading flow">
        <div className={styles.flowStep}>Framework: why &amp; who</div>
        <div className={styles.flowArrow} aria-hidden="true">
          →
        </div>
        <div className={styles.flowStep}>Blueprints: what it looks like</div>
        <div className={styles.flowArrow} aria-hidden="true">
          →
        </div>
        <div className={styles.flowStep}>Playbooks: how to build</div>
        <div className={styles.flowArrow} aria-hidden="true">
          ↔
        </div>
        <div className={styles.flowStep}>Architecture: platform foundations</div>
      </div>
    </SectionPageLayout>
  );
}
