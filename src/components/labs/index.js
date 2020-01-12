import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "../loading-spinner";
import styles from "./labs.module.scss";
import FadeInTranslate from "../animation-wrappers/fade-in-translate";

function Labs() {
  let { url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.layout}>
      <FadeInTranslate fade_matrix>
        <p className={styles.prenounciation}>/la-b(ə-)rə-ˌtȯr-ē/</p>
        <h1 className={styles.headline}>Laboratory.</h1>
        <p className={styles.intro}>
          Where thoughts and experiments come to explode.{" "}
          <span role="img" aria-label="exploding head emoji">
            🤯
          </span>
        </p>
        <ul className={styles.childrenlist}>
          <FadeInTranslate fade_matrix>
            <li key="LAB_5">
              <Link className={styles.link} to={`${url}/5`}>
                Smooth Scrolling
              </Link>
            </li>
            {/* <li key="LAB_4">
              <Link className={styles.link} to={`${url}/4`}>
                Three.js | Anime.js Timeline
              </Link>
            </li> */}
            <li key="LAB_3">
              <Link className={styles.link} to={`${url}/3`}>
                Image Liquid Effect
              </Link>
            </li>
            <li key="LAB_2">
              <Link className={styles.link} to={`${url}/2`}>
                List Image Distort
              </Link>
            </li>
            {/* <li key="LAB_1">
              <Link className={styles.link} to={`${url}/1`}>
                React Spring
              </Link>
            </li> */}
          </FadeInTranslate>
        </ul>
      </FadeInTranslate>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default Labs;
