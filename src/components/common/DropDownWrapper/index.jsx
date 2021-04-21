import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { showModal, hideModal } from '$redux/features/modal';

import styles from './index.module.scss';

const Container = styled.div`
  position: absolute;
  background-color: #FFFFFF;
  padding: 1rem 0.5rem;
  min-width: 180px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 3999;
`;

const DropDownWrapper = (props) => {
  // refs
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  // state
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
  });

  // props
  const {
    children,
    options,
    optionElement,
    handleSelect,
  } = props;
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    document.addEventListener("click", handleClose);
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 27 || evt.key === "Escape" || evt.key === "Esc") {
      updateBounds(true);
    }
  }

  const updateBounds = (isClear) => {
    if (!isClear) {
      return;
    }

    dispatch(hideModal());
    setBounds({
      top: 0,
      left: 0,
    });
  }

  const handleClose = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
      updateBounds(true);
    }
  }, [bounds]);

  // handler
  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const bound = btnRef.current.getBoundingClientRect();
    dispatch(showModal('EMPTY', {
      noWrapper: true,
    }));

    setBounds({
      top: bound.bottom + 10,
      // left: bound.left - (bound.width),
    });
  }

  const buildDropDown = () => {
    const content = optionElement ? (
      <div className={styles.dropdownElementMenu}>
        {optionElement}
      </div>
    ) : (
      <div className={styles.dropdownBubbleMenu}>
        {
          options.map((opt, idx) => (
            <a
              key={`opt-${name}-${idx}`}
              onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                handleSelect(opt.name);
                updateBounds(true);
              }}
              className={`${styles.dropdownOption} ${opt.style ? opt.style : ''}`}
            >
              {opt.title}
            </a>
          ))
        }
      </div>
    );

    return (
      <Container
        top={bounds.top}
        ref={dropdownRef}
      >
        { content}
      </Container>
    );
  }

  // render
  return (
    <div
      ref={btnRef}
      onClick={handleClick}
      className={styles.dropdownWrapperBtn}
    >
      {children}
      {
        bounds.top ?
          buildDropDown() :
          null
      }
    </div>
  );
}

DropDownWrapper.defaultProps = {
  options: [],
  handleSelect: () => null,
  optionElement: null,
};

DropDownWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  handleSelect: PropTypes.func,
  optionElement: PropTypes.node,
};

export default DropDownWrapper;
