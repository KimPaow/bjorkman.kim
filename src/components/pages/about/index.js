import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../loading-spinner";
import FadeInTranslate from "../../animation-wrappers/fade-in-translate";
import styles from "./about.module.scss";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.root}>
      <FadeInTranslate fade_matrix>
        <h1 className={styles.headline}>
          Reactive things.
          <br />
          Interesting things.
        </h1>
        <p className={styles.body}>
          This is the home of Kim Björkman, the site serves as both a showcase
          and a place to experiment.
        </p>
        <p className={styles.body}>
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
