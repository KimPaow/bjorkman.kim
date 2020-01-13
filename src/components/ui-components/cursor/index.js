import React, { useEffect } from "react";
import styles from "./cursor.module.scss";
import useEventListener from "../../../utils/hooks/useEventListener";
import { TweenMax, Power2 } from "gsap";
import { ShowInStateAndUp } from "../hide-in-states";

export default function Cursor(props) {
  let prevClientX = 0;
  let prevClientY = 0;
  // set the starting position of the cursor outside of the screen
  let clientX = -100;
  let clientY = -100;
  let isSmall = false;
  let angleDeg = 0;

  const handleMove = e => {
    prevClientX = clientX;
    prevClientY = clientY;
    clientX = e.clientX;
    clientY = e.clientY;
    angleDeg =
      (Math.atan2(prevClientY - clientY, prevClientX - clientX) * 180) /
      Math.PI;
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
    let historicClientX = 0;
    let historicClientY = 0;
    var time = 200;
    var tracker = setInterval(function() {
      historicClientX = clientX;
      historicClientY = clientY;
    }, time);

    const initCursor = () => {
      let innerCursor = document.querySelector(`.${styles.cursor_small}`);
      let outerCursor = document.querySelector(`.${styles.cursor_outer}`);

      const render = () => {
        let speed =
          Math.max(
            Math.abs(historicClientX - clientX),
            Math.abs(historicClientY - clientY)
          ) / time;

        TweenMax.set(innerCursor, {
          x: clientX,
          y: clientY
        });
        TweenMax.to(outerCursor, 0.55, {
          x: clientX,
          y: clientY,
          ease: Power2.easeOut,
          transform: `rotateZ(${angleDeg}deg)`,
          width: !isSmall ? `${speed * 1.5 + 4}rem` : `${speed * 2 + 6}rem`,
          height: !isSmall ? "4rem" : "6rem",
          top: !isSmall ? "-2rem" : "-3rem",
          left: !isSmall ? "-2rem" : "-3rem"
        });

        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    };

    initCursor();

    return () => {
      clearInterval(tracker);
    };
  }, [prevClientX, prevClientY, clientX, clientY, isSmall, angleDeg]);

  return (
    <ShowInStateAndUp desktop={true}>
      <div className={`${styles.cursor} ${styles.cursor_small}`}></div>
      <div className={`${styles.cursor} ${styles.cursor_outer}`}></div>
    </ShowInStateAndUp>
  );
}
