import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useTrail, animated } from "react-spring";
import { Keyframes } from "react-spring/renderprops";
import LoadingSpinner from "../loading-spinner";
import styles from "./labs.module.scss";

import Parallax from "./parallax";

function Labs() {
  let { path, url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const children = [
    <li>
      <Link className={styles.link} to={`${url}/1`}>
        Parallax
      </Link>
    </li>
  ];

  const config = { mass: 10, tension: 2000, friction: 200 };

  const trail = useTrail(children.length, {
    config,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded
      ? "matrix(1.00,0.00,0.00,1.00,0,0)"
      : "matrix(0.82,-0.57,0.57,0.82,100,50)"
  });

  const createExpList = (children, trail) => {
    return trail.map(({ ...props }, index) => (
      <animated.div
        key={children[index]}
        className="trails-text"
        style={{
          ...props
        }}
      >
        {children[index]}
      </animated.div>
    ));
  };

  return isLoaded ? (
    <Switch>
      <Route exact path="/labs">
        <div className={styles.layout}>
          <span className={styles.prenounciation}>/la-b(ə-)rə-ˌtȯr-ē/</span>
          <h1>Laboratory.</h1>
          <p className={styles.intro}>
            Where thoughts and experiments come to explode.{" "}
            <span role="img" aria-label="exploding head emoji">
              🤯
            </span>
          </p>
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
