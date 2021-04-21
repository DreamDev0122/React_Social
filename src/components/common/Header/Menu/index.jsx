import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Menu = (props) => {
  // props
  const {name, title, isActive, onClick} = props;

  // handlers
  const handleClick = () => {
    onClick(name);
  }

  // return
  return (
    <button
      className={`d-flex flex-column align-items-center ${styles.menuBtn} px-2`}
      onClick={handleClick}
      type="button"
    >
      <span className={styles.menuText}>{title}</span>
      <div className={`${styles.activeDot} ${isActive ? 'visible' : 'invisible'}`} />
    </button>
  );
}

Menu.defaultProps = {
  isActive: false,
};

Menu.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default Menu;
