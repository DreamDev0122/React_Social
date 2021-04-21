import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Alert = (props) => {
  // props
  const { type, content } = props;

  const style = type === 'error' ? 'auth-alert-danger' : 'auth-alert-success';

  // render
  return (
    <div className={`auth-alert d-flex justify-content-center align-items-center ${style}`}>
      { content }
    </div>
  );
};

Alert.defaultProps = {
  type: 'success',
};

Alert.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Alert;
