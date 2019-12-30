import React, { useEffect, useState } from "react";
import { useTrail, animated, config } from "react-spring";
import styles from "./about.module.scss";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const items = [
    {
      text: "Reactive things.\nInteresting things.",
      type: "headline",
      key: 1
    },
    {
      text: `This is the home of Kim Björkman, the site serves as both a showcase and a place to experiment.`,
      type: "paragraph",
      key: 2
    },
    {
      text: `A painter turned VFX/3D artist, turned graphic designer, turned backend
        developer, turned frontend developer. Kim tries to shape a
        multi-disciplinary background into highly polished digital experiences.`,
      type: "paragraph",
      key: 3
    }
  ];

  const trail = useTrail(items.length, {
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded
      ? "matrix(1.00,0.00,0.00,1.00,0,0)"
      : "matrix(1, 0.05, -0.05, 1, 0, 50)",
    from: { opacity: 0, transform: "matrix(1, 0.05, -0.05, 1, 0, 50)" }
  });

  return (
    <div className={styles.root}>
      {trail.map(({ ...rest }, index) => {
        return items[index].type === "headline" ? (
          <animated.h1
            className={styles.headline}
            style={{ ...rest }}
            key={items[index].key}
          >
            {items[index].text}
          </animated.h1>
        ) : items[index].type === "paragraph" ? (
          <animated.p
            className={styles.body}
            style={{ ...rest }}
            key={items[index].key}
          >
            {items[index].text}
          </animated.p>
        ) : null;
      })}
    </div>
  );
};

export default About;
