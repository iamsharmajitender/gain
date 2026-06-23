import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const gainLetters = [
  {
    letter: 'G',
    name: 'Grounded',
    keywords: 'Truth, context, knowledge alignment',
    color: 'g',
  },
  {
    letter: 'A',
    name: 'Adaptive',
    keywords: 'Learning, feedback, continuous evolution',
    color: 'a',
  },
  {
    letter: 'I',
    name: 'Intelligent',
    keywords: 'Reasoning, agents, decision systems',
    color: 'i',
  },
  {
    letter: 'N',
    name: 'Native',
    keywords: 'Scalable, modular, future-ready design',
    color: 'n',
  },
] as const;

export default function HomepageGainSystem(): ReactNode {
  return (
    <section className="gain-home-system">
      <div className="container">
        <div className="gain-home-system__box">
          <div className="gain-home-system__header">
            <div className="gain-home-system__intro">
              <h2>Signature Framework</h2>
              <p className="gain-home-system__title">G.A.I.N Framework</p>
              <p className="gain-home-system__subtitle">
                Governed AI-Native Systems: how I structure enterprise AI work across strategy,
                platforms, and delivery.
              </p>
            </div>
            <Link to="/frameworks" className="gain-home-system__view-all">
              Explore framework →
            </Link>
          </div>
          <div className="gain-home-system__grid">
            {gainLetters.map((item) => (
              <div
                key={item.letter}
                className={clsx('gain-home-system__item', `gain-home-system__item--${item.color}`)}>
                <span className="gain-home-system__letter">{item.letter}</span>
                <h3>{item.name}</h3>
                <p className="gain-home-system__keywords">{item.keywords}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
