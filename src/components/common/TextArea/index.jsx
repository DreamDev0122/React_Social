import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const TextArea = (props) => {
  // props
  const {
    name,
    value,
    onChange,
    placeholder,
    title,
  } = props;

  // handlers
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  }

  // render
  return (
    <>
      <p>{title}</p>
      <div className={styles.formTextAreaWrapper}>
        <textarea
          name={name}
          className={styles.formTextArea}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

TextArea.defaultProps = {
  title: '',
  value: '',
}

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextArea;
