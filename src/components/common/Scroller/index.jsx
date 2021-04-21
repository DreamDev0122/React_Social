import React, { useCallback, useRef, useEffect } from 'react';
import gsap, { Power2 } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Button from '$components/common/Button';

import styles from './index.module.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

gsap.registerPlugin(Draggable, ScrollToPlugin);

const Scroller = (props) => {
  // props
  const {
    name,
    children,
    showHeader,
    title,
    isLoading,
  } = props;

  const containerId = `${name}-container`;
  const noMedia = !isLoading && children.length < 1;

  // refs
  const scrollRef = useRef(0);

  // handlers
  const applyBoounds = useCallback(() => {
    const container = document.getElementById(containerId);
    var minx = window.innerWidth - container.clientWidth - 450;
    var maxx = 0;
    Draggable.get(container).applyBounds({
      minX: minx,
      maxX: maxx
    });
  }, [children]);

  const setup = useCallback(() => {
    const container = document.getElementById(containerId);
    var left = children.length * 300;
    gsap.set(container, {
      width: left,
    });

    Draggable.create(container, {
      type: 'x',
      throwProps: true,
      edgeResistance: 0.95,
      allowNativeTouchScrolling: false,
      onDragStart: (elem) => scrollRef.current = elem.x,
      onDragEnd: (elem) => scrollRef.current = Math.abs(scrollRef.current - elem.x),
    })[0];
  }, [children]);

  const handleNavRight = () => {
    scrollRef.current += 400;
    gsap.to(`#outer${name}`, {
      duration: 1,
      scrollTo: {
        x: scrollRef.current,
      },
      ease: gsap.Power2,
    });
  }

  const handleNavLeft = () => {
    console.log('scrollRef.current ', scrollRef.current);
    scrollRef.current -= 400;
    console.log('scrollRef.current left ', scrollRef.current);
    gsap.to(`#outer${name}`, {
      duration: 2,
      scrollTo: {
        x: scrollRef.current,
      },
      ease: gsap.Power2,
    });
  }

  useEffect(() => {
    setup();
    applyBoounds();
  }, [children]);

  // render
  return (
    <div>
      {
        showHeader && (
          <div className="d-flex align-items-center my-4">
            <div className={`d-flex ${styles.titleWrapper}`}>
              <span className={styles.heading}>
                {title}
              </span>
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
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      {
        noMedia
        && (
          <p>No media available.</p>
        )
      }
      <div
        id={`outer${name}`}
        className={`${styles.wrapper} ${(isLoading && noMedia) || noMedia ? styles.collapsed : ''}`}
      >
        <div
          className={styles.container}
          id={containerId}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Scroller;
