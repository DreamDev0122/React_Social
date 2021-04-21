import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

import styles from './index.module.scss';

// don't forget to register plugins
gsap.registerPlugin(Draggable); 

// New Timeline
const tl = gsap.timeline({
  paused: true,
});

const Slider = (props) => {
  // props
  const {
    callbacks,
    position,
  } = props;

  // refs
  const knobRef = useRef(null);
  const progressBarRef = useRef(null);
  const rangeRef = useRef(null);

  // effects
  useEffect(() => {
    Draggable.create(knobRef.current, {
      type: "x",
      trigger: progressBarRef.current,
      bounds: progressBarRef.current,
      edgeResistance: 1,
      lockAxis: true,
      cursor: "pointer",
      ease: "Power0.easeNone",
      onDrag: updateRange,
      onPressInit: updatePosition,
      onClick: updateRange,
    });
  }, []);

  useEffect(() => {
    const pos = Number.isNaN(position) ? 0 : position;
    update(pos);
  }, [position]);

  // handlers
  // To syncronise both audio and timeline
  const update = (value) => {
    const knobRect = knobRef.current.getBoundingClientRect();
    const progRect = progressBarRef.current.getBoundingClientRect();

    tl.progress(value); // NOTE: audio.currentTime / audio.duration
    gsap.set(knobRef.current, {
      x: (progRect.width - knobRect.width) * value,
    });

    gsap.set(rangeRef.current, {
      width: progRect.width * value,
    });
  }

  function updatePosition() {
    const knobRect = knobRef.current.getBoundingClientRect();
    const progRect = progressBarRef.current.getBoundingClientRect();
    gsap.set(knobRef.current, {
      x: this.pointerX - progRect.left - knobRect.width / 2,
    });

    gsap.set(rangeRef.current, {
      width: knobRect.left + knobRect.width - progRect.left
    });
    // CALLBACK TO SEEK
  }

  // repositions tl + elements when user clicks on audio scrub
  function updateRange() {
    const knobRect = knobRef.current.getBoundingClientRect();
    const progRect = progressBarRef.current.getBoundingClientRect();

    const currentPosition = this.x / (progRect.width - knobRect.width);
    tl.progress(currentPosition);
    gsap.set(rangeRef.current, {
      width: knobRect.left + knobRect.width - progRect.left
    });

    callbacks.updateRange(currentPosition);
  }

  // render
  return (
    <div className={styles.progressBar} ref={progressBarRef}>
      <div className={styles.knobMenu} ref={knobRef} />
      <div className={styles.rangeMenu} ref={rangeRef} />
    </div>
  );
}

Slider.defaultProps = {
  callbacks: {},
};

Slider.propTypes = {
  callbacks: PropTypes.objectOf(PropTypes.func),
};

export default Slider;
