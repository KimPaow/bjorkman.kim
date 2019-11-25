import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import styles from "./animation-root.module.scss";
import { GoMarkGithub } from "react-icons/go";
import { FaBitbucket } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import OrganicSphere from "../organic-sphere/organic-sphere";

const AnimationRoot = props => {
  useEffect(() => {
    let tl = anime.timeline({});
  });

  return (
    <div className={styles.root}>
      <h1>Kim Björkman</h1>
      {/* <div className={styles.name}>
        <h2>キム　ビョークマン</h2>
      </div> */}
      {/* <ul className={styles.links}>
        <li className={`${styles.link} ${styles.bitbucket}`}>
          <a href="https://bitbucket.org/kimbjorkman/profile/repositories">
            <FaBitbucket />
          </a>
        </li>
        <li className={`${styles.link} ${styles.github}`}>
          <a href="https://github.com/KimPaow">
            <GoMarkGithub />
          </a>
        </li>
      </ul> */}
      <div className={styles.intro_container}>
        こんにちわ、
        <br />
        キムといます。日本に働きたいです。良かったら連絡してください。
        <br />
        よろしくお願いします〜
        {/* <br /> */}
        &nbsp; &nbsp;
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
      </div>
      <OrganicSphere />
    </div>
  );
};

export default AnimationRoot;
