import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
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
      <div className="form-check">
        <input
          name={name}
          className="form-check-input"
          type="checkbox"
          id="gridCheck"
          onChange={handleChange}
          value={value}
        />
        <label
          className="form-check-label"
          htmlFor="gridCheck"
        >
          {title}
        </label>
      </div>
    </div>
  )
}

Checkbox.defaultProps = {
  title: '',
}

Checkbox.propTypes = {
  title: PropTypes.string,
}

export default Checkbox;
