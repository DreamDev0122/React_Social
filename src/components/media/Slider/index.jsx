import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from './index.module.scss';

const Range = styled.input`
  &::-webkit-slider-thumb {
    box-shadow: -${props => props.width}px 0 0 ${props => props.width}px;
  }
`;

const Slider = (props) => {
  // props
  const {
    callbacks,
    value,
    maxValue,
  } = props;

  // refs
  const rangeRef = useRef(null);
  
  // state
  const [width, setWidth] = useState(0);

  // effects
  useEffect(() => {
    if (!rangeRef.current) {
      return;
    }

    const sliderWidth = rangeRef.current.clientWidth;
    setWidth(sliderWidth);
  }, []);

  // handlers
  const handleUpdate = (evt) => {
    const { value: currentValue } = evt.target;
    callbacks.updateRange(currentValue);
  }

  // render
  return (
    <div className={styles.wrapper}>
      <Range
        ref={rangeRef}
        className={styles.slider}
        onChange={handleUpdate}
        width={width}
        type="range"
        min="0"
        max={Math.ceil(maxValue)}
        value={Number.isNaN(value) ? 0 : Math.ceil(value)}
      />
    </div>
  );
}

Slider.defaultProps = {
  maxValue: 100,
}

Slider.propTypes = {
  maxValue: PropTypes.number,
}

export default Slider;
