import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import styles from "./about.module.scss";

const FadeInTranslate = React.lazy(() =>
  import("../../animation-wrappers/fade-in-translate")
);
const LoadingSpinner = React.lazy(() => import("../../loading-spinner"));

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.root}>
      <Helmet>
        <title>About</title>
      </Helmet>
      <FadeInTranslate fade_matrix>
        <h1 className={styles.headline}>
          Reactive things.
          <br />
          Interesting things.
        </h1>
        <p className={`${styles.body}`}>
          This is the home of Kim Björkman, the site serves as both a showcase
          and a place to experiment.
        </p>
        <p className={`${styles.body} ${styles.indent}`}>
          A painter turned VFX/3D artist, turned graphic designer, turned
          backend developer, turned frontend developer. Kim tries to shape a
          multi-disciplinary background into highly polished digital
          experiences.
        </p>
      </FadeInTranslate>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default About;
