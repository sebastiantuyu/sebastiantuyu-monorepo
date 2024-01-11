import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Love for Simplicity',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        I'm always looking at the most beautiful and simplest solutions,
        but loving of <b>going in-depth</b> to learn every aspects of it.
      </>
    ),
  },
  {
    title: 'Architecture Geek',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      If there is one thing that I truly love is creating or proposing new distributed systems for
      online services, from payment gateways to batching processes.
      </>
    ),
  },
  {
    title: 'UX Driven',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        No matter what we're building, I'm always driven by providing the best UX to the final client.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
