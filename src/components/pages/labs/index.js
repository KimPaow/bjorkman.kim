import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Helmet from "react-helmet";
import styles from "./labs.module.scss";

const LoadingSpinner = React.lazy(() => import("../../loading-spinner"));
const FadeInTranslate = React.lazy(() =>
  import("../../animation-components/fade-in-translate")
);
const AnimatedLink = React.lazy(() =>
  import("../../ui-components/animated-link")
);

function Labs() {
  let { url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const linkStyle = {
    fontWeight: "500",
    lineHeight: "normal"
  };

  return isLoaded ? (
    <div className={styles.layout}>
      <Helmet>
        <title>The lab</title>
      </Helmet>
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
              <AnimatedLink style={linkStyle} to={`${url}/5`}>
                Smooth Scrolling
              </AnimatedLink>
            </li>
            {/* <li key="LAB_4">
              <Link className={styles.link} to={`${url}/4`}>
                Three.js | Anime.js Timeline
              </Link>
            </li> */}
            <li key="LAB_3">
              <AnimatedLink style={linkStyle} to={`${url}/3`}>
                Image Liquid Effect
              </AnimatedLink>
            </li>
            <li key="LAB_2">
              <AnimatedLink style={linkStyle} to={`${url}/2`}>
                List Image Distort
              </AnimatedLink>
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
