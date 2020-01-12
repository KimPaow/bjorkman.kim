import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useTrail, animated, config } from "react-spring";
import LoadingSpinner from "../loading-spinner";
import styles from "./labs.module.scss";

function Labs() {
  let { url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const labLinksData = [
    {
      key: "LAB_5",
      text: "Smooth Scrolling",
      to: `${url}/5`
    },
    // {
    //   key: "LAB_4",
    //   text: "Three.js | Anime.js Timeline",
    //   to: `${url}/4`
    // },
    {
      key: "LAB_3",
      text: "Image Liquid Effect",
      to: `${url}/3`
    },
    {
      key: "LAB_2",
      text: "List Image Distort",
      to: `${url}/2`
    }
    // {
    //   key: "LAB_1",
    //   text: "React Spring",
    //   to: `${url}/1`
    // }
  ];

  const listTrail = useTrail(labLinksData.length, {
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
        const listItem = labLinksData[index];
        return (
          <animated.li key={listItem.key} style={props}>
            <Link className={styles.link} to={listItem.to}>
              {listItem.text}
            </Link>
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
    <div className={styles.layout}>
      {trail.map((props, index) => {
        return (
          <animated.div key={index} style={props}>
            {children[index]}
          </animated.div>
        );
      })}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default Labs;
