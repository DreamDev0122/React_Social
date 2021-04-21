import React from 'react';
import PropTypes from 'prop-types';

import TabMenu from './Menu';

import styles from './index.module.scss';

const initialOptions = [
  { name: 'audio', title: 'Audios' },
  { name: 'video', title: 'Videos' },
  { name: 'movie', title: 'Movies' },
];

const Tabs = (props) => {
  // props
  const {
    name,
    selected,
    onSelect,
    options,
    activeColor,
  } = props;

  // render
  return (
    <>
    <div className="d-flex flex-wrap">
      {
        options.map((opt, idx) => (
          <TabMenu
            key={`tab-${name}-${idx}`}
            title={opt.title}
            name={opt.name}
            isActive={selected === opt.name}
            onClick={onSelect}
            activeColor={activeColor}
          />
        ))
      }
    </div>
    <div
      className={styles.tabLine}
      style={{
        backgroundColor: activeColor,
        borderColor: activeColor,
      }}
    />
    </>
  );
}

Tabs.defaultProps = {
  options: initialOptions,
  activeColor: null,
}

Tabs.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  activeColor: PropTypes.string,
}

export default Tabs;

