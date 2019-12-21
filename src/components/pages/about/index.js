import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import styles from "./about.module.scss";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeadlineVisible, setIsHeadlineVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // animation chain
    setTimeout(() => {
      setIsHeadlineVisible(true);
    }, 700);
  }, []);

  const headlineFadeSpring = useSpring({
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? `translate(0, 0)` : `translate(0, 20px)`
  });
  const introFadeSpring = useSpring({
    config: {
      mass: 10,
      tension: 2000,
      friction: 200,
      delay: 5.0
    },
    opacity: isHeadlineVisible ? 1 : 0,
    transform: isHeadlineVisible ? `translate(0, 0)` : `translate(0, 20px)`
  });

  return (
    <div className={styles.root}>
      <animated.h1
        className={styles.headline}
        style={{ ...headlineFadeSpring }}
      >
        Reactive things.
        <br />
        Interesting things.
      </animated.h1>
      <animated.p className={styles.body} style={{ ...introFadeSpring }}>
        This is the home of Kim Björkman, both a display-case and a place to
        play around.
      </animated.p>
      <animated.p className={styles.body} style={{ ...introFadeSpring }}>
        A painter turned VFX/3D artist, turned graphic designer, turned backend
        developer, turned frontend developer. Kim tries to shape a
        multi-disciplinary background into highly polished digital experiences.
      </animated.p>
    </div>
  );
};

export default About;
