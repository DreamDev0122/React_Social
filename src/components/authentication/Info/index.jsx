import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const arrowUp = require('$assets/images/icons/arrow-up.svg');

const Info = (props) => {
  // props
  const { value } = props;

  // render
  return (
    <div className="d-flex align-items-center info-panel px-4">
      <div className="d-flex info-panel-wrapper justify-content-center align-items-center">
        { value }
      </div>
      <img
        className=""
        src={arrowUp}
        alt=""
      />
    </div>
  );
};

Info.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Info;
