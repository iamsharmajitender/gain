import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {
  type DomainPageConfig,
  getDomainSiteSections,
} from '@site/src/data/domainPages';
import {backToInsights} from '@site/src/data/contextualBackLinks';
import styles from './domain-page.module.css';

type DomainPageProps = {
  config: DomainPageConfig;
};

function renderParagraph(text: string): ReactNode {
  const parts = text.split(/G\.A\.I\.N/);
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 ? <Link to="/frameworks">G.A.I.N</Link> : null}
    </span>
  ));
}

export default function DomainPage({config}: DomainPageProps): ReactNode {
  const siteSections = getDomainSiteSections(config);

  return (
    <SectionPageLayout
      title={config.title}
      subtitle={config.subtitle}
      sectionLabel="Domains"
      hideNav
      backLink={backToInsights}
    >
      <div className={styles.tabBox}>
        <h2 className={styles.tabBoxTitle}>What this means here</h2>
        {config.meaningParagraphs.map((paragraph, index) => (
          <p key={index}>{renderParagraph(paragraph)}</p>
        ))}
      </div>

      <div className={styles.tabBox}>
        <h2 className={styles.tabBoxTitle}>What it should cover</h2>
        <p className={styles.lead}>{config.whenToUse}</p>
        <div className={styles.coverageList}>
          {config.coverageAreas.map((area) => (
            <div key={area.title} className={styles.coverageItem}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tabBox}>
        <h2 className={styles.tabBoxTitle}>On this site</h2>
        <p className={styles.exploreIntro}>
          Content is organised by section, filtered by domain. Start anywhere below — all paths lead
          back to the same practice model.
        </p>
        <div className={styles.exploreGrid}>
          {siteSections.map((section) => (
            <Link key={section.href} to={section.href} className={styles.exploreTile}>
              <h3 className={styles.exploreTileTitle}>{section.label}</h3>
              <p className={styles.exploreTileDesc}>{section.description}</p>
              <span className={styles.exploreTileLink}>Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.ctaBox}>
        <p>{config.ctaText}</p>
        <Link to="/advisory" className={styles.ctaLink}>
          Explore advisory →
        </Link>
      </div>
    </SectionPageLayout>
  );
}
