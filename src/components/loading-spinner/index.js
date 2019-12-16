import React from "react";
import styles from "./loading-spinner.module.scss";
import { config } from "react-spring";
import { Keyframes } from "react-spring/renderprops";

function LoadingSpinner() {
  const AnimationScript = Keyframes.Spring(async (next, delay) => {
    while (true) {
      await next({
        x: 0,
        from: { x: 10 },
        config: config.gentle
      });
      await next({
        x: 15,
        from: { x: 0 },
        config: config.gentle
      });
    }
  });

  return (
    <AnimationScript>
      {anim => (
        <svg className={styles.spinnerRoot}>
          <rect
            strokeWidth={`${anim.x}`}
            stroke={`rgba(255,255,255,${anim.x / 10})`}
            fill="none"
            height="100%"
            width="100%"
          />
        </svg>
      )}
    </AnimationScript>
  );
}

export default LoadingSpinner;
