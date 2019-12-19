import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import styles from "./work.module.scss";

const Work = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeadlineVisible, setIsHeadlineVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // animation chain
    setTimeout(() => {
      setIsHeadlineVisible(true);
    }, 700);
  }, []);

  const titleFadeSpring = useSpring({
    config: config.gentle,
    opacity: isHeadlineVisible ? 0.6 : 0
  });
  const headlineFadeSpring = useSpring({
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? `translate(0, 0)` : `translate(0, 20px)`
  });

  return (
    <div className={styles.root}>
      <animated.p
        style={{ ...titleFadeSpring }}
        className={styles.prenounciation}
      >
        /la-b(ə-)rə-ˌtȯr-ē/
      </animated.p>
      <animated.h1
        className={styles.headline}
        style={{ ...headlineFadeSpring }}
      >
        Work.
      </animated.h1>
    </div>
  );
};

export default Work;
