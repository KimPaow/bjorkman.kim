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
    <Link className={styles.logoContainer} to={`/`}>
      <animated.div
        id="logoRoot"
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

        {/* <svg
          className={`${styles.sfx_1} ${styles.sfx}`}
          xmlns="http://www.w3.org/2000/svg"
          width="149.749"
          height="134.274"
        >
          <path
            fill="yellow"
            d="M2.249 28.774l13 77 20-7-2-27 30-9v-28l-29 11-2-28-30 11zM55.749 24.274l7-22 17 3-12 22-12-3zM77.749 25.274l11-20h15l-8 22-18-2zM104.749 52.274l-1 19-28 8v22l28-8v14l-24 5 4 15 21-7v12h12l3-17 24-10v-13l-23 9v-10l27-9v-21l-24 7 1-20-20 4z"
          />
        </svg>
        <svg
          className={`${styles.sfx_2} ${styles.sfx}`}
          xmlns="http://www.w3.org/2000/svg"
          width="136.323"
          height="99.44"
        >
          <path
            fill="yellow"
            d="M2.324 20.079l12 54 20-5-4-18 28-4v-23s-22 5-26 7c-2-3-2-22-2-22zM51.323 16.079l9 2 12-16h-14l-7 14zM72.323 18.079h16l8-15-16-1-8 16zM96.323 37.079l-1 16-27 6 2 15 25-6-1 10-22 4 3 10 19-4v9l12-2 4-13 22-6v-10l-22 6v-6l24-8v-13l-22 5 1-15-17 2z"
            class="cls-1"
          />
        </svg>
        <svg
          className={`${styles.sfx_3} ${styles.sfx}`}
          xmlns="http://www.w3.org/2000/svg"
          width="136.323"
          height="99.44"
        >
          <path
            fill="yellow"
            d="M2.324 20.079l12 54 20-5-4-18 28-4v-23s-22 5-26 7c-2-3-2-22-2-22zM51.323 16.079l9 2 12-16h-14l-7 14zM72.323 18.079h16l8-15-16-1-8 16zM96.323 37.079l-1 16-27 6 2 15 25-6-1 10-22 4 3 10 19-4v9l12-2 4-13 22-6v-10l-22 6v-6l24-8v-13l-22 5 1-15-17 2z"
            class="cls-1"
          />
        </svg> */}
      </animated.div>
    </Link>
  );
};

export default Logo;
