import {useEffect, type ReactNode} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import AboutPageLayout from '@site/src/components/AboutPageLayout';
import {backgroundEntries, careerHighlights} from '@site/src/data/aboutProfile';
import {aboutTabs, type AboutTabId} from '@site/src/data/sectionNav';
import CredentialsTab from './_credentials-tab';
import CareerTimeline from './_career-timeline';
import styles from './about.module.css';

/** Old About tab query values → current tab ids (bookmarks / inbound links). */
const legacyAboutTabRedirects: Record<string, AboutTabId> = {
  philosophy: 'about',
  'how-i-lead': 'about',
  'why-this-exists': 'about',
  'what-i-build': 'work',
  industries: 'work',
  'career-highlights': 'background',
};

function AboutLegacyTabRedirect(): null {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (!tab) {
      return;
    }
    const next = legacyAboutTabRedirects[tab];
    if (!next) {
      return;
    }
    params.set('tab', next);
    const search = params.toString();
    history.replace(`${location.pathname}${search ? `?${search}` : ''}`);
  }, [history, location.pathname, location.search]);

  return null;
}

function AboutTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>About</h2>
      <p>
        I believe AI systems should be grounded in truth, designed for adaptivity, and built with
        responsibility.
      </p>
      <p>
        Great architecture is not just about systems. It is about enabling change safely at scale. I
        start with first principles, prefer simplicity over complexity, and design for scale rather
        than exceptions.
      </p>
      <p>
        I lead at the intersection of business strategy, platform architecture, and AI capability,
        helping organisations modernise safely in regulated environments across Australia, the UAE,
        and India.
      </p>
      <p>
        Today that work spans enterprise cloud and application modernisation at NAB, multi-cloud
        platforms (AWS and Azure), and responsible GenAI adoption: setting direction, standards, and
        roadmaps with senior stakeholders, and enabling teams through patterns, governance, and
        architecture boards.
      </p>

      <h3 className={styles.tabSectionTitle}>How I Lead</h3>
      <p>I lead through design authority and operating models, not engineering people management.</p>
      <ul>
        <li>Set technical direction and reference architectures across delivery streams</li>
        <li>Partner with business and executive stakeholders on roadmaps and tradeoffs</li>
        <li>Establish standards, architecture review boards, COEs, and governance frameworks</li>
        <li>Shape AI and platform adoption strategies that hold up in production</li>
        <li>Enable teams through patterns, playbooks, and clear decision frameworks</li>
      </ul>
      <p>This is the work I do in enterprise architecture, and what I write about publicly.</p>

      <h3 className={styles.tabSectionTitle}>Why This Exists</h3>
      <p>
        This site is where I build in public: frameworks, architecture notes, playbooks, blueprints,
        and insights from enterprise architecture work.
      </p>
      <p>
        I publish for architects, engineering leaders, and transformation teams navigating AI,
        platform modernization, system design, and distributed systems. If my perspective resonates,
        Advisory is how we work together; Insights is how I share what I learn.
      </p>
    </div>
  );
}

function WorkTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Work</h2>
      <p>
        I advise and lead architecture for enterprise platforms and AI-enabled systems, currently as
        Enterprise Architect at NAB, with deep prior work in aviation (Emirates), energy (AusNet
        Services), retail (Tesco), and digital transformation consulting (Sapient) across banking and
        enterprise clients in India and the UAE.
      </p>
      <p>
        My work spans cloud modernisation, distributed and event-driven platforms, integration
        architecture, and governed production AI, including GenAI adoption strategy, agent runtimes,
        RAG pipelines, and the observability and policy layers that make AI trustworthy at scale.
      </p>

      <h3 className={styles.tabSectionTitle}>Industries</h3>
      <p>
        Deep experience in regulated, mission-critical environments where architecture, governance,
        and operational resilience are non-negotiable.
      </p>
      <ul>
        <li>Banking & financial services: core banking, payments, digital channels</li>
        <li>Aviation: global customer and operations platforms</li>
        <li>Critical infrastructure & energy: mission-critical utility services</li>
        <li>Retail & enterprise platforms: large-scale distributed systems</li>
        <li>Digital consulting: enterprise transformation, platform modernization, and architecture governance</li>
      </ul>
      <p>Based in Melbourne, with delivery experience across Australia, the UAE, and India.</p>
    </div>
  );
}

function BackgroundTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Background</h2>
      <p className={styles.lead}>
        A condensed arc from software engineering through enterprise architecture in regulated
        banking, aviation, and critical infrastructure. Outcomes and scope matter more than title
        inflation.
      </p>

      <h3 className={styles.tabSectionTitle}>Career Highlights</h3>
      <ul>
        {careerHighlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <h3 className={styles.tabSectionTitle}>Timeline</h3>
      <CareerTimeline entries={backgroundEntries} />
    </div>
  );
}

const aboutTabContent: Record<AboutTabId, () => ReactNode> = {
  about: AboutTab,
  work: WorkTab,
  background: BackgroundTab,
  credentials: CredentialsTab,
};

export default function About(): ReactNode {
  return (
    <AboutPageLayout>
      <AboutLegacyTabRedirect />
      <Tabs queryString="tab" defaultValue="about" className={styles.aboutTabs}>
        {aboutTabs.map((tab) => {
          const TabContent = aboutTabContent[tab.id];
          return (
            <TabItem key={tab.id} value={tab.id} label={tab.label}>
              <TabContent />
            </TabItem>
          );
        })}
      </Tabs>
    </AboutPageLayout>
  );
}
