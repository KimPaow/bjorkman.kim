import React, { useEffect } from "react";
import styles from "./smooth-scroll.module.scss";
import useEventListener from "../../../utils/hooks/useEventListener";
import { lerp } from "../../../utils/helpers/animation";
import PropTypes from "prop-types";

const SmoothScroll = props => {
  const { options, className, ...rest } = props || {};
  const { skew = true, ease = 0.1 } = options || {};
  let contentEl = null;
  let documentHeight = 0;
  let scrollOffset = 0;
  let prevScrollOffset = 0;

  const initAnimationLoop = () => {
    const renderDefault = () => {
      prevScrollOffset = lerp(prevScrollOffset, scrollOffset, ease);
      prevScrollOffset = Math.round(prevScrollOffset);

      if (prevScrollOffset < 0.1) {
        prevScrollOffset = 0;
      }

      const diff = Math.round(scrollOffset - prevScrollOffset);
      const speed = diff * 0.01;

      if (contentEl) {
        contentEl.style.transform = `translate3d(0, -${prevScrollOffset}px, 0) skewY(${speed}deg)`;
      }
      requestAnimationFrame(renderDefault);
    };
    const renderNoSkew = () => {
      prevScrollOffset = lerp(prevScrollOffset, scrollOffset, ease);
      prevScrollOffset = Math.round(prevScrollOffset);

      if (prevScrollOffset < 0.1) {
        prevScrollOffset = 0;
      }

      if (contentEl) {
        contentEl.style.transform = `translate3d(0, -${prevScrollOffset}px, 0)`;
      }
      requestAnimationFrame(renderNoSkew);
    };
    requestAnimationFrame(skew ? renderDefault : renderNoSkew);
  };

  const handleScroll = () => {
    // get scrolled amount
    scrollOffset = window.pageYOffset || window.scrollTop || 0;
  };

  useEventListener("scroll", handleScroll);

  const setBodyHeight = reset => {
    if (!document || !document.body) {
      console.error(
        "Tried setting body height but document.body was not found."
      );
      return null;
    }
    if (!reset) {
      documentHeight = contentEl.getBoundingClientRect().height + 150;
      document.body.style.height = `${documentHeight / 10}rem`;
    }
    if (reset) {
      document.body.style.height = `100%`;
    }
  };

  const handleResize = () => {
    setBodyHeight();
  };

  useEventListener("resize", handleResize);

  // when ref is mounted check if the height has
  // ... stabilized, set body height to the stable value
  const refCallback = el => {
    if (!el) return;
    contentEl = el;
    let prevValue = JSON.stringify(el.getBoundingClientRect());

    const handle = setInterval(() => {
      let nextValue = JSON.stringify(el.getBoundingClientRect());
      if (nextValue === prevValue) {
        // size stopped changing
        clearInterval(handle);
        setBodyHeight();
      } else {
        // size changed, check again in 100ms
        prevValue = nextValue;
      }
    }, 100);
  };

  useEffect(() => {
    initAnimationLoop();

    return () => {
      setBodyHeight(true);
    };
  });

  return (
    <section
      {...rest}
      ref={refCallback}
      className={`${styles.scroll_container} ${className}`}
    >
      {props.children}
    </section>
  );
};

export default SmoothScroll;

SmoothScroll.propTypes = {
  options: PropTypes.shape({
    ease: PropTypes.number,
    skew: PropTypes.bool
  })
};
