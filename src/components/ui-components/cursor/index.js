import React, { useEffect } from "react";
import styles from "./cursor.module.scss";
import useEventListener from "../../../utils/hooks/useEventListener";
import { TweenMax, Power2 } from "gsap";
import { ShowInStateAndUp } from "../hide-in-states";
import { useSpring, animated } from "react-spring";

export default function Cursor(props) {
  // set the starting position of the cursor outside of the screen
  let clientX = -100;
  let clientY = -100;

  const [greetingStatus, displayGreeting] = React.useState(false);
  const [springProps, set, stop] = useSpring(() => ({ opacity: 1 }));

  const handleMove = e => {
    clientX = e.clientX;
    clientY = e.clientY;
  };

  useEventListener("mousemove", handleMove);

  const handleClick = e => {
    console.log("click");
  };

  useEventListener("click", handleClick);

  useEffect(() => {
    const initCursor = () => {
      let innerCursor = document.querySelector(`.${styles.cursor_small}`);
      let outerCursor = document.querySelector(`.${styles.cursor_outer}`);

      const render = () => {
        // lastX = lerp(lastX, clientX, 0.2);
        // lastY = lerp(lastY, clientY, 0.2);
        // outerCursor.style.transform = `translate(${lastX}px, ${lastY}px)`;
        TweenMax.set(innerCursor, {
          x: clientX,
          y: clientY
        });
        TweenMax.to(outerCursor, 0.55, {
          x: clientX,
          y: clientY,
          ease: Power2.easeOut
        });

        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    };

    initCursor();
  }, [clientX, clientY]);

  return (
    <ShowInStateAndUp desktop={true}>
      <div className={`${styles.cursor} ${styles.cursor_small}`}></div>
      <div className={`${styles.cursor} ${styles.cursor_outer}`}></div>
    </ShowInStateAndUp>
  );
}
