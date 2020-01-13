import React, { useEffect } from "react";
import styles from "./cursor.module.scss";
import useEventListener from "../../../utils/hooks/useEventListener";
import { TweenMax, Power2 } from "gsap";
import { ShowInStateAndUp } from "../hide-in-states";

export default function Cursor(props) {
  // set the starting position of the cursor outside of the screen
  let clientX = -100;
  let clientY = -100;
  let isSmall = false;

  const handleMove = e => {
    clientX = e.clientX;
    clientY = e.clientY;
  };

  useEventListener("mousemove", handleMove);

  const handleClick = e => {
    isSmall = !isSmall;
    setTimeout(() => {
      isSmall = !isSmall;
    }, 100);
  };

  useEventListener("click", handleClick);

  useEffect(() => {
    const initCursor = () => {
      let innerCursor = document.querySelector(`.${styles.cursor_small}`);
      let outerCursor = document.querySelector(`.${styles.cursor_outer}`);

      const render = () => {
        TweenMax.set(innerCursor, {
          x: clientX,
          y: clientY
        });
        TweenMax.to(outerCursor, 0.55, {
          x: clientX,
          y: clientY,
          ease: Power2.easeOut,
          width: !isSmall ? "2rem" : "0.8rem",
          height: !isSmall ? "2rem" : "0.8rem",
          top: !isSmall ? "-1rem" : "-0.4rem",
          left: !isSmall ? "-1rem" : "-0.4rem"
        });

        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    };

    initCursor();
  }, [clientX, clientY, isSmall]);

  return (
    <ShowInStateAndUp desktop={true}>
      <div className={`${styles.cursor} ${styles.cursor_small}`}></div>
      <div className={`${styles.cursor} ${styles.cursor_outer}`}></div>
    </ShowInStateAndUp>
  );
}
