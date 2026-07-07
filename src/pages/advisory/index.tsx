import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {
  advisoryCaseStudies,
  advisoryCtaText,
  advisoryEmail,
  advisoryEngagementModels,
  advisoryLinkedInUrl,
  advisoryServices,
  approachIntro,
  approachPrinciples,
  caseStudiesIntro,
  caseStudyDomainLabels,
  contactIntro,
  contactLocation,
  servicesLead,
} from '@site/src/data/advisoryProfile';
import {
  advisorySubtitle,
  advisoryTabs,
  type AdvisoryTabId,
} from '@site/src/data/sectionNav';
import styles from './advisory.module.css';

function AdvisoryCta(): ReactNode {
  return (
    <div className={styles.ctaBox}>
      <p>{advisoryCtaText}</p>
      <Link to="/advisory?tab=contact" className={styles.ctaLink}>
        Discuss your context →
      </Link>
    </div>
  );
}

function ServicesTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>How I Work With Leaders</h2>
      <p className={styles.lead}>{servicesLead}</p>
      <div className={styles.helpList}>
        {advisoryServices.map((service) => (
          <div key={service.title} className={styles.helpItem}>
            <span className={styles.helpIcon}>{service.icon}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApproachTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>How I Engage</h2>
      <p>{approachIntro}</p>
      <ul>
        {approachPrinciples.map((principle) => (
          <li key={principle}>{principle}</li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudiesTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Case Studies</h2>
      <p className={styles.lead}>{caseStudiesIntro}</p>
      <div className={styles.caseStudyGrid}>
        {advisoryCaseStudies.map((study) => (
          <article key={study.title} className={styles.caseStudyCard}>
            <span className={clsx(styles.domainTag, styles[`domain_${study.domain}`])}>
              {caseStudyDomainLabels[study.domain]}
            </span>
            <h3 className={styles.caseStudyTitle}>{study.title}</h3>
            <p className={styles.caseStudyOutcome}>{study.outcome}</p>
          </article>
        ))}
      </div>
      <p className={styles.caseStudyFootnote}>
        More background on{' '}
        <Link to="/about?tab=career-highlights">About → Career Highlights</Link>.
      </p>
    </div>
  );
}

function EngagementTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Engagement Models</h2>
      <ul>
        {advisoryEngagementModels.map((model) => (
          <li key={model.title}>
            <strong>{model.title}</strong>: {model.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Get in Touch</h2>
      <p>{contactIntro}</p>
      <p>{contactLocation}</p>
      <p>
        Email:{' '}
        <a href={`mailto:${advisoryEmail}`} className={styles.emailLink}>
          {advisoryEmail}
        </a>
      </p>
      <a
        href={advisoryLinkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ctaButton}
      >
        Connect on LinkedIn
      </a>
    </div>
  );
}

const advisoryTabContent: Record<AdvisoryTabId, () => ReactNode> = {
  services: ServicesTab,
  approach: ApproachTab,
  'case-studies': CaseStudiesTab,
  engagement: EngagementTab,
  contact: ContactTab,
};

export default function Advisory(): ReactNode {
  return (
    <SectionPageLayout
      title="Advisory"
      subtitle={advisorySubtitle}
      sectionLabel="Advisory"
      hideNav
    >
      <Tabs queryString="tab" defaultValue="services" className={styles.advisoryTabs}>
        {advisoryTabs.map((tab) => {
          const TabContent = advisoryTabContent[tab.id];
          return (
            <TabItem key={tab.id} value={tab.id} label={tab.label}>
              <TabContent />
              <AdvisoryCta />
            </TabItem>
          );
        })}
      </Tabs>
    </SectionPageLayout>
  );
}
