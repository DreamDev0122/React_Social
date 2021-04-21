import React from 'react';

// TODO: Merge system stats with insights
const SystemStats = () => {
  // state
  const [selected, setSelected] = useState('insights');

   // handlers
  const buildPane = (name, value) => (
    <div className={`d-flex flex-column text-center ${styles.bubbleWrapper}`}>
      <p className={styles.bubbleTitle}>{name}</p>
      <div className={`d-flex justify-content-center align-items-center ${styles.bubble}`}>
        <span>{value}</span>
      </div>
    </div>
  );

  // <span className={styles.title}>{data.plays || 0} Users</span>

  // render
  return (
     <div className={styles.container}>
      <div className={styles.tabsWrapper}>
        <Tabs
          onSelect={setSelected}
          selected={selected}
          options={options}
          name="insights"
          activeColor="#8C8C8C"
        />
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="d-flex flex-column">
            
            <div className={styles.titleBorder} />
          </div>
          <div className={`d-flex flex-wrap ${styles.dataWrapper}`}>

          </div>
        </div>
      </div>
    </div>
  );  
}

export default SystemStats;
