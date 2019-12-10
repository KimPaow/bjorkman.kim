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
      <h1 hidden>Kim Björkman</h1>
      {/* <div className={styles.name}>
        <h2>キム　ビョークマン</h2>
      </div> */}
      <div className={styles.intro_container}>
        <p>
          こんにちは、
          <br />
          キムといます。日本に働きたいです。良かったら連絡してください。
          <br />
          よろしくお願いします〜 &nbsp;
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
        </p>
        <OrganicSphere />
      </div>
    </div>
  );
};

export default AnimationRoot;
