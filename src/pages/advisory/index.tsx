import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {advisoryNav, advisorySubtitle} from '@site/src/data/sectionNav';
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

export default function AdvisoryServices(): ReactNode {
  return (
    <SectionPageLayout
      title="Advisory"
      subtitle={advisorySubtitle}
      sectionLabel="Advisory"
      navItems={advisoryNav}
      activeHref="/advisory"
    >
      <h2>How I Work With Leaders</h2>
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
      <div className={styles.ctaBox}>
        <p>
          Open to advisory conversations and Principal / Enterprise Architect opportunities.
        </p>
        <Link to="/advisory/contact" className={styles.ctaLink}>
          Discuss your context →
        </Link>
      </div>
    </SectionPageLayout>
  );
}
