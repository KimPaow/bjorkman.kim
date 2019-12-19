import React, { useEffect, useState } from "react";
import styles from "./animation-root.module.scss";
import { GoMarkGithub } from "react-icons/go";
import { FaBitbucket } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import OrganicSphere from "../organic-sphere/organic-sphere";
import { useTrail, animated } from "react-spring";

const AnimationRoot = props => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Experiments List Trail
  const children = [
    "こんにちは。",
    "キムといます、良かったら連絡してください。",
    "よろしくお願いします〜",
    <span>
      <a href="https://github.com/KimPaow">
        <GoMarkGithub />
      </a>
      &nbsp;
      <a href="https://bitbucket.org/kimbjorkman/profile/repositories">
        <FaBitbucket />
      </a>
      &nbsp;
      <a href="https://medium.com/@kimbjrkman">
        <FaMedium />
      </a>
      &nbsp;
      <a href="mailto:kim.bjorkman@sunnyatsea.se">
        <MdEmail />
      </a>
      &nbsp;
    </span>
  ];

  const trailConfig = { mass: 10, tension: 2000, friction: 200, delay: 5000 };

  const trail = useTrail(children.length, {
    config: trailConfig,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.root}>
      <h1 hidden>Kim Björkman</h1>
      <div className={styles.intro_container}>
        <div className={styles.intro}>{createExpList(children, trail)}</div>
        <OrganicSphere />
      </div>
    </div>
  ) : null;
};

export default AnimationRoot;
