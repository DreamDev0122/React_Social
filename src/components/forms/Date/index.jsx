import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const defaultDate = new Date();

const InputDate = (props) => {
  // props
  const {
    title,
    name,
    onChange,
    value,
  } = props;

  // handlers
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  }

  // render
  return (
    <div className="form-group">
      <p>{title}</p>
      <div className="d-flex flex-column custom-date-wrapper">
        <input
          name={name}
          className="custom-date"
          type="date"
          onChange={handleChange}
          value={value || defaultDate}
        />
      </div>
    </div>
  )
}

InputDate.defaultProps = {
  title: '',
}

InputDate.propTypes = {
  title: PropTypes.string,
}

export default InputDate;
