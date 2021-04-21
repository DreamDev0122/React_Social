import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Refractor the avatarInput with the Drag&Drop
import styles from './index.module.scss';

const camera = require('$assets/images/photo-camera.svg');

const Pic = styled.div`
  display: inline-block;
  border-radius: 3px;
  background-image: url(${props => props.url});;
  background-size: cover;
  background-position: top;
`;

const AvatarInput = (props) => {
  // props
  const { onChange, url } = props;

  // state
  const [active, setActive] = useState(false);

  // refs
  const fileRef = useRef(null);

  // handlers
  const handleDrop = (ev) => {
    ev.preventDefault();
    let currentUpload = [];

    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i += 1) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i].getAsFile();
          currentUpload.push(file);
        }
      }
    } else {
      currentUpload = ev.dataTransfer.files;
    }

    onChange(currentUpload);
  }

  const handleDragOver = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  const handleDragEnter = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    setActive(true);
  }

  const handleDragLeave = (ev) => {
    ev.preventDefault();
    setActive(false);
  }

  const handleSelectFile = () => {
    fileRef.current.click();
  }

  const handleChange = () => {
    onChange(fileRef.current.files);
  }

  // render
  return (
    <>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${styles.avatarInputWrapper}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
      >
        {
          url ? (
            <Pic
              className={styles.avatarInputWrapperImage}
              url={url}
            />
          ) : (active ? (
            <p className={`text-center ${styles.dragTitle}`}>
              Drop Image
            </p>
          ) : (
            <p className="text-center">
              Drag and Drop your Image Here
            </p>
          ))
        }
        <button
          className={`d-flex align-items-center ${styles.avatarBtn}`}
          onClick={handleSelectFile}
        >
          <img
            src={camera}
            className={styles.avatarBtnIcon}
            alt=""
          />
          <span>Select Image</span>
        </button>
      </div>
      <input
        className="d-none"
        type="file"
        ref={fileRef}
        onChange={handleChange}
      />
    </>
  );
}

AvatarInput.defaultProps = {
  url: null,
}

AvatarInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string,
}

export default AvatarInput;
