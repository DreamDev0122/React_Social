import React from 'react';

import Feature from '$components/common/Feature';
import List from '$components/marketing-site/List';

import model from './model';

import styles from './index.module.scss';

const HowItWorks = () => {
  // render
  return (
    <div className={`container ${styles.panel}`}>
      <div className="row">
        <div className="col-12 col-md-6">
          <p className={styles.panelHeader}>How It Works</p>
          <p className="text-white">consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
          {
            model.map((datum, idx) => (
              <List
                key={`how-it-works-list-${idx}`}
                num={idx + 1}
                title={datum.title}
                description={datum.description}
              />
            ))
          }
        </div>
        <div className={`col-12 col-md-6 ${styles.howItWorksFeature}`}>
          <Feature
              avatar="zja5uydd1795854_10152370111653109_115441845_o.jpg"
              source="https://i.ibb.co/0G3Mbwp/image-2.png"
              subtitle=""
              title=""
              numOfSongs=""
              duration=""
            />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
