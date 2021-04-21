import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Progress = (props) => {
  // props
  const { values, placeholder } = props;

  // state
  const [percentage, setPercentage] = useState(0);

  // effects
  useEffect(() => {
    const arr = Object.values(values);
    const score = arr.reduce((acc, value) => {
      return value ? acc + 1 : acc;
    }, 0);

    setPercentage(Math.floor(Math.ceil((score / arr.length) * 100)));
  }, [values]);

  // render
  return (
    <div className="d-flex align-items-center progress-wrapper">
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="mx-2">
        {percentage}% {placeholder}
      </span>
    </div>
  );
};

Progress.defaultProps = {
  values: {},
  placeholder: 'Complete',
};

Progress.propTypes = {
  values: PropTypes.object,
  placeholder: PropTypes.string,
};

export default Progress;
