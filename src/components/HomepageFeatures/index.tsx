import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  //Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  image?: string;
  description: ReactNode;
  to?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'System Architecture',
    image: 'img/system-architecture.png',
    to: '/insights/tags/system-architecture',
    description: (
      <>
      Distributed systems, cloud platforms, microservices, and enterprise-scale design.
      </>
    ),
  },
  {
    title: 'AI Systems',
    image: 'img/ai-systems.png',
    to: '/insights/tags/ai-intelligence',
    description: (
      <>
      LLMs, RAG, and agentic AI systems in production.
      </>
    ),
  },
  {
    title: 'Platform, Integration & Governance',
    image: 'img/platform-integration-governance.png',
    to: '/insights/tags/platforms-engineering',
    description: (
      <>
      Integration, governance, security, observability, and reliability at scale.
      </>
    ),
  },
];

function Feature({title, image, description, to}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {image && <img src={image} alt={title} className={styles.featureSvg} />}
      </div>
      <div className="text--center padding-horiz--md">
        {to ? (
          <Link to={to}>
            <Heading as="h3">{title}</Heading>
          </Link>
        ) : (
          <Heading as="h3">{title}</Heading>
        )}
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
