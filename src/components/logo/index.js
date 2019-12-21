import React from "react";
import styles from "./logo.module.scss";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";

const calc = (x, y) => [-(y - 90), x - 90, 1.1];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Logo = () => {
  // const winkSpring = useSpring({ height: "0.3rem" });
  const [transSpring, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.gentle
  }));

  return (
    <Link to={`/`}>
      <animated.div
        className={styles.root}
        onMouseMove={({ clientX: x, clientY: y }) => {
          set({ xys: calc(x, y) });
        }}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: transSpring.xys.interpolate(trans) }}
      >
        <span className={styles.eyeLeft}></span>
        <span className={styles.eyeRight}></span>
        <span className={styles.mouth}>O</span>
        {/* <p className={styles.fx}>ギュアアッ</p> */}
      </animated.div>
    </Link>
  );
};

export default Logo;
