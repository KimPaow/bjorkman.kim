import React, { useRef } from "react";
import styles from "./logo.module.scss";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";

const Logo = () => {
  const [transSpring, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.gentle
  }));

  const logoRef = useRef(null);

  const calc = (x, y) => [
    -(y - (logoRef.current.offsetTop + logoRef.current.clientHeight / 2)),
    x - (logoRef.current.offsetLeft + logoRef.current.clientWidth / 2),
    1.1
  ];

  const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  return (
    <Link to={`/`}>
      <animated.div
        ref={logoRef}
        className={styles.root}
        onMouseMove={({ clientX: x, clientY: y }) => {
          set({ xys: calc(x, y) });
        }}
        onMouseLeave={() => {
          set({ xys: [0, 0, 1] });
        }}
        style={{ transform: transSpring.xys.interpolate(trans) }}
      >
        <span className={styles.eyeLeft}></span>
        <span className={styles.eyeRight}></span>
        <span className={styles.mouth}></span>
        {/* <p className={styles.fx}>ギュアアッ</p> */}
      </animated.div>
    </Link>
  );
};

export default Logo;
