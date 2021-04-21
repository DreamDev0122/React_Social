import React from 'react';

import TextInput from '$components/common/TextInput';
import { socialIcons } from '$common/icons';

import styles from './index.module.scss';

const SocialInput = (props) => {
  // props
  const {
    name,
    onChange,
    value,
    placeholder,
    icon,
  } = props;

  // render
  return (
    <div className="d-flex align-items-center">
      <img
        src={socialIcons[icon].iconActive}
        className={styles.socialInputIcon}
        alt=""
      />
      <TextInput
        name={name}
        customWrapperClass={styles.socialInputText}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default SocialInput;
