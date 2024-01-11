import clsx from 'clsx';
import Heading from "@theme/Heading";
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Love for Simplicity',
    Svg: require('@site/static/img/undraw_visionary_technology_re_jfp7.svg').default,
    description: (
      <>
        I aim for simple and effective solutions to engineering problems,
        enjoying exploring all aspects of the challenges at hand.
      </>
    ),
  },
  {
    title: 'Architecture Geek',
    Svg: require('@site/static/img/undraw_cloud_hosting_7xb1.svg').default,
    description: (
      <>
        I have a deep passion for crafting innovative distributed systems for online services,
        ranging from payment gateways to batching processes.
      </>
    ),
  },
  {
    title: 'UX Driven',
    Svg: require('@site/static/img/undraw_experience_design_re_dmqq.svg').default,
    description: (
      <>
        Regardless of the project, my motivation always centers around delivering the best user experience to the end client.
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
