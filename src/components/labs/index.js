import React, { useEffect, useState } from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import { useTrail, useSpring, animated, config } from "react-spring";
import LoadingSpinner from "../loading-spinner";
import styles from "./labs.module.scss";

import Lab1 from "./lab1";

function Labs() {
  let { path, url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeadlineVisible, setIsHeadlineVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // animation chain
    setTimeout(() => {
      setIsHeadlineVisible(true);
      setTimeout(() => {
        setIsIntroVisible(true);
      }, 300);
    }, 700);
  }, []);

  const titleFadeSpring = useSpring({
    config: config.gentle,
    opacity: isHeadlineVisible ? 0.6 : 0
    // transform: isHeadlineVisible ? `translate(0, 0)` : `translate(0, 20px)`
  });
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

  // Experiments List Trail
  const children = [
    <li>
      <Link className={styles.link} to={`${url}/1`}>
        React-Spring
      </Link>
    </li>
  ];

  const trailConfig = { mass: 10, tension: 2000, friction: 200, delay: 5000 };

  const trail = useTrail(children.length, {
    config: trailConfig,
    opacity: isIntroVisible ? 1 : 0,
    transform: isIntroVisible
      ? "matrix(1.00,0.00,0.00,1.00,0,0)"
      : "matrix(0.82,-0.57,0.57,0.82,50,50)"
  });

  const createExpList = (children, trail) => {
    return trail.map((props, index) => (
      <animated.div key={children[index]} style={props}>
        {children[index]}
      </animated.div>
    ));
  };
  // End Experiments List Trail

  return isLoaded ? (
    <>
      <Route exact path="/labs">
        <div className={styles.layout}>
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
            Laboratory.
          </animated.h1>
          <animated.p style={{ ...introFadeSpring }} className={styles.intro}>
            Where thoughts and experiments come to explode.{" "}
            <span role="img" aria-label="exploding head emoji">
              🤯
            </span>
          </animated.p>
          <ul className={styles.childrenlist}>
            {createExpList(children, trail)}
          </ul>
        </div>
      </Route>
      <Route path={`${path}/1`}>
        <Lab1 />
      </Route>
    </>
  ) : (
    <LoadingSpinner />
  );
}

export default Labs;
