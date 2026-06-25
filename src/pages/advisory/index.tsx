import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {
  advisorySubtitle,
  advisoryTabs,
  type AdvisoryTabId,
} from '@site/src/data/sectionNav';
import styles from './advisory.module.css';

const services = [
  {
    icon: '◎',
    title: 'Architecture & AI Strategy',
    description:
      'Align leadership on roadmaps, platform readiness, and responsible GenAI adoption.',
  },
  {
    icon: '⬡',
    title: 'Operating Model & Reference Architecture',
    description:
      'Define how AI and platforms run in your enterprise: standards, governance, and G.A.I.N patterns.',
  },
  {
    icon: '→',
    title: 'Transformation & Delivery Leadership',
    description:
      'Hands-on design authority from blueprint to production across regulated environments.',
  },
  {
    icon: '◉',
    title: 'Team Enablement',
    description:
      'Patterns, playbooks, and architecture standards. Building capability, not managing headcount.',
  },
];

function AdvisoryCta(): ReactNode {
  return (
    <div className={styles.ctaBox}>
      <p>Open to advisory conversations and Principal / Enterprise Architect opportunities.</p>
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
      <div className={styles.helpList}>
        {services.map((service) => (
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
      <p>
        I work from first principles: understanding the business problem, constraints, and success
        criteria before defining architecture. Every engagement balances speed with governance,
        especially in regulated environments.
      </p>
      <ul>
        <li>Start with the problem, not the technology</li>
        <li>Design for evolution, not just delivery</li>
        <li>Embed observability and governance from day one</li>
        <li>Enable teams through clarity, patterns, and standards</li>
        <li>Build in public: share patterns and lessons that accelerate outcomes</li>
      </ul>
    </div>
  );
}

function CaseStudiesTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Case Studies</h2>
      <p>
        Engagements across banking, aviation, and critical infrastructure: cloud modernization,
        platform design, and governed AI adoption at scale.
      </p>
      <p>
        Detailed case studies available on request. Reach out to discuss relevant experience for your
        organization.
      </p>
    </div>
  );
}

function EngagementTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Engagement Models</h2>
      <ul>
        <li>
          <strong>Architecture reviews</strong>: structured assessment with actionable recommendations
        </li>
        <li>
          <strong>Strategy workshops</strong>: align stakeholders on target architecture and roadmap
        </li>
        <li>
          <strong>Fractional leadership</strong>: hands-on guidance during transformation programs
        </li>
        <li>
          <strong>Design authority</strong>: ongoing advisory for architecture decisions and governance
        </li>
      </ul>
    </div>
  );
}

function ContactTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Get in Touch</h2>
      <p>
        Interested in advisory work or discussing Principal / Enterprise Architect opportunities?
        Reach out to share your context.
      </p>
      <p>
        Email:{' '}
        <a href="mailto:jitender.sharma@outlook.com" className={styles.emailLink}>
          jitender.sharma@outlook.com
        </a>
      </p>
      <a
        href="https://linkedin.com/in/iamsharmajitender"
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
