import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Button from '$components/common/Button';

import styles from './index.module.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

// don't forget to register plugins
gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollToPlugin); // ??

let v = 0;

const ScrollPanel = (props) => {
  // props
  const {
    showHeader,
    title,
    children,
  } = props;

  // ref
  const wrapperBox = useRef(null);
  const observer = useRef(null);
  const atStart = useRef(false);
  const atEnd = useRef(false);
  const firstElement = useRef(null);
  const lastElement = useRef(null);

  const callback = useCallback((entries) => {
    atStart.current = false;
    atEnd.current = false;
    // console.log('entries ', entries);
    entries.forEach((entry) => {
      if (entry.target.className === "first-element") {
        atStart.current = true;
        console.log('FE');
      }

      if (entry.target.className === "last-element") {
        atEnd.current = true;
        console.log('LE');
      }
    });
  }, []);

  useEffect(() => {
    Draggable.create("#wrapperBoxes", {
      bounds: "#dragSpace",
      type: "x",
      // throwProps: true,
      // snap: (endValue) => Math.round(endValue / 300) * 300,
    });
  }, []);

  useEffect(() => {
    if (!children || !children[0]) {
      return;
    }
  }, [children]);

  // handlers
  const handleNavRight = () => {
    if (atEnd.current || v < -(children.length * 300)) {
      return;
    }

    v -= 600;
    gsap.to(wrapperBox.current, { duration: 2, x: v });
  }

  const handleNavLeft = () => {
    console.log('atStart.current ', atStart.current);
    if (atStart.current || v > 500) {
      return;
    }

    v += 600;
    gsap.to(wrapperBox.current, { duration: 2, x: v });
  }

  // render
  return (
    <div className={styles.scrollMenuWrapper}>
      {
        showHeader && (
          <div className="d-flex align-items-center my-4">
            <div className={`d-flex ${styles.albumMenuTitleWrapper}`}>
              <span className={styles.heading}>{title}</span>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleNavLeft}
                isCustom
                hideDefault
              >
                <img src={arrowLeftIcon} />
              </Button>
              <Button
                onClick={handleNavRight}
                isCustom
                hideDefault
              >
                <img src={arrowRightIcon} />
              </Button>
            </div>
          </div>
        )
      }
      <div id="dragSpace" className={styles.dragSpace}>
        <div id="wrapperBoxes" ref={wrapperBox} className={`${styles.wrapperBoxes}`}>
          <div
            className="first-element"
            ref={firstElement}
          />
          {children}
          <div
            className="last-element"
            ref={lastElement}
          />
        </div>
      </div>
    </div>
  );
}

ScrollPanel.defaultProps = {
  title: '',
  showHeader: false,
  isRounded: false,
  children: null,
};

ScrollPanel.propTypes = {
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  isRounded: PropTypes.bool,
  children: PropTypes.node,
};

export default ScrollPanel;

/*
observer.current = new IntersectionObserver(callback, {
      root: document.querySelector('#dragSpace'),
      rootMargin: '0px',
      threshold: 1.0
    });
    observer.current.observe(firstElement.current);
    observer.current.observe(lastElement.current);
*/
