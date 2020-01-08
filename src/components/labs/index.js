import React, { useEffect, useState } from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import { useTrail, animated, config } from "react-spring";
import LoadingSpinner from "../loading-spinner";
import styles from "./labs.module.scss";

const Lab1 = React.lazy(() => import("./lab1"));
const Lab2 = React.lazy(() => import("./lab2"));
const WaterEffect = React.lazy(() => import("./lab3"));
const Lab4 = React.lazy(() => import("./lab4"));
const Lab5 = React.lazy(() => import("./lab5"));

function Labs() {
  let { path, url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Experiments List Trail
  const listChildren = [
    <Link key="5" className={styles.link} to={`${url}/5`}>
      Smooth Scrolling
    </Link>,
    // <Link key="4" className={styles.link} to={`${url}/4`}>
    //   Three.js | Anime.js Timeline
    // </Link>,
    <Link key="3" className={styles.link} to={`${url}/3`}>
      Image Liquid Effect
    </Link>,
    <Link key="2" className={styles.link} to={`${url}/2`}>
      Image List Distort
    </Link>,
    <Link key="1" className={styles.link} to={`${url}/1`}>
      React-Spring
    </Link>
  ];

  const listTrail = useTrail(listChildren.length, {
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded
      ? "matrix(1.00,0.00,0.00,1.00,0,0)"
      : "matrix(1, 0.05, -0.05, 1, 0, 50)",
    from: { opacity: 0, transform: "matrix(1, 0.05, -0.05, 1, 0, 50)" }
  });

  const children = [
    <animated.p className={styles.prenounciation}>
      /la-b(ə-)rə-ˌtȯr-ē/
    </animated.p>,
    <animated.h1 className={styles.headline}>Laboratory.</animated.h1>,
    <animated.p className={styles.intro}>
      Where thoughts and experiments come to explode.{" "}
      <span role="img" aria-label="exploding head emoji">
        🤯
      </span>
    </animated.p>,
    <ul className={styles.childrenlist}>
      {listTrail.map((props, index) => {
        return (
          <animated.li key={`${listChildren[index]}_${index}`} style={props}>
            {listChildren[index]}
          </animated.li>
        );
      })}
    </ul>
  ];

  const trail = useTrail(children.length, {
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded
      ? "matrix(1.00,0.00,0.00,1.00,0,0)"
      : "matrix(1, 0.05, -0.05, 1, 0, 50)",
    from: { opacity: 0, transform: "matrix(1, 0.05, -0.05, 1, 0, 50)" }
  });
  // End Experiments List Trail

  return isLoaded ? (
    <>
      <Route exact path="/labs">
        <div className={styles.layout}>
          {trail.map((props, index) => {
            return (
              <animated.div key={index} style={props}>
                {children[index]}
              </animated.div>
            );
          })}
        </div>
      </Route>
      <Route path={`${path}/1`}>
        <div className={styles.labsContainer}>
          <Lab1 />
        </div>
      </Route>
      <Route path={`${path}/2`}>
        <div className={styles.labsContainer}>
          <Lab2 />
        </div>
      </Route>
      <Route path={`${path}/3`}>
        <div className={styles.labsContainer}>
          <WaterEffect />
        </div>
      </Route>
      <Route path={`${path}/4`}>
        <div className={styles.labsContainer}>
          <Lab4 />
        </div>
      </Route>
      <Route path={`${path}/5`}>
        <Lab5 />
      </Route>
    </>
  ) : (
    <LoadingSpinner />
  );
}

export default Labs;
