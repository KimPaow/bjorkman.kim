import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useTrail, useSpring, animated, config } from "react-spring";
import LoadingSpinner from "../loading-spinner";
import styles from "./labs.module.scss";

import Parallax from "./parallax";

function Labs() {
  let { path, url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeadlineVisible, setIsHeadlineVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(17, 18, 26)";
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
  const introFadeSpringConfig = {
    mass: 10,
    tension: 2000,
    friction: 200,
    delay: 5.0
  };
  const introFadeSpring = useSpring({
    config: introFadeSpringConfig,
    opacity: isHeadlineVisible ? 1 : 0,
    transform: isHeadlineVisible ? `translate(0, 0)` : `translate(0, 20px)`
  });

  // Experiments List Trail
  const children = [
    <li>
      <Link className={styles.link} to={`${url}/1`}>
        Parallax
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
    <Switch>
      <Route exact path="/labs">
        <div className={styles.layout}>
          <animated.p
            style={{ ...titleFadeSpring }}
            className={styles.prenounciation}
          >
            /la-b(ə-)rə-ˌtȯr-ē/
          </animated.p>
          <animated.h1 style={{ ...headlineFadeSpring }}>
            Laboratory.
          </animated.h1>
          <animated.p style={{ ...introFadeSpring }} className={styles.intro}>
            Where thoughts and experiments come to explode.{" "}
            <span role="img" aria-label="exploding head emoji">
              🤯
            </span>
          </animated.p>
          <ul>{createExpList(children, trail)}</ul>
        </div>
      </Route>
      <Route path={`${path}/1`}>
        <Parallax />
      </Route>
    </Switch>
  ) : (
    <LoadingSpinner />
  );
}

export default Labs;
