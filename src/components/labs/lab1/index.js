import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../loading-spinner";
import styles from "./lab1.module.scss";
import mainImg1 from "./lab1-1.jpg";
import mainImg2 from "./lab1-2.jpg";
import { config, animated } from "react-spring";
import { Keyframes } from "react-spring/renderprops";
import delay from "delay";

function Lab1() {
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    {
      mainImg: mainImg1,
      img: mainImg2,
      title: "Video & Sound",
      subtitle: "Studio Creative",
      linkText: "MEET OUR STUDIO",
      ctaTitle: "Behind the scenes",
      ctaHeadline: "Magical scenes of a promotional film"
    },
    {
      mainImg: mainImg2,
      img: mainImg1,
      title: "Graphic-Design",
      subtitle: "Studio Creative",
      linkText: "MEET OUR DESIGNERS",
      ctaTitle: "Behind the scenes",
      ctaHeadline: "Take a look at our process"
    },
    {
      mainImg: mainImg1,
      img: mainImg1,
      title: "Branding",
      subtitle: "Studio Creative",
      linkText: "MAKE YOUR BRAND FRESH",
      ctaTitle: "Behind the scenes",
      ctaHeadline: "Take a look at our process"
    }
  ];

  const ScrollIndicatorSpring = Keyframes.Spring({
    wiggle: async (next, cancel, ownProps) => {
      while (true) {
        await next({
          from: {
            transform: `translate(-50%, -110%)`,
            opacity: 1,
            height: "1rem"
          },
          transform: `translate(-50%, 200%)`,
          height: "0.3rem",
          config: config.wobbly,
          reset: true
        });
        await next({
          from: {
            opacity: 1
          },
          opacity: 0,
          config: config.gentle,
          reset: true
        });
        await delay(1000);
      }
    }
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.root}>
      <div className={styles.bg}>
        <div></div>
        <div></div>
      </div>
      <div className={styles.maincontent}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>Björk.</div>
          <ul className={styles.header}>
            <li>
              <a href="/labs/1">HOME</a>
            </li>
            <li>
              <a href="/labs/1">ABOUT US</a>
            </li>
            <li>
              <a href="/labs/1">PORTFOLIO</a>
            </li>
            <li>
              <a href="/labs/1">CONTACT</a>
            </li>
            <li>
              <button className={styles.hamburger}>
                <span className={styles.hamburgerItem} />
                <span className={styles.hamburgerItem} />
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.hero_container}>
          <div className={styles.content}>
            <div className={styles.mainImg_container}>
              <img
                className={styles.mainImg}
                src={slides[0].mainImg}
                alt="man on subway"
              />
            </div>
            <img
              className={styles.previewImg}
              src={slides[0].img}
              alt="portrait"
            />
            <div className={styles.textContent}>
              <h1>
                <span>{slides[0].title}</span>
                <br />
                <span>{slides[0].subtitle}</span>
              </h1>
              <a className={styles.textContentLink} href="/labs">
                {slides[0].linkText}
              </a>
            </div>
            <div className={styles.sliderControls}>
              <p className={styles.slidenumber}>
                <span>01</span>
                <span> / </span>
                <span>03</span>
              </p>
              <div className={styles.slideIndicator}>
                <span className={styles.active} />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className={styles.cta_grid}>
            <a href="/labs/1" className={styles.cta_container}>
              <div className={styles.cta_scroll}>
                <div className={styles.cta_scroll_icon}>
                  <ScrollIndicatorSpring state="wiggle">
                    {anim => <animated.span style={anim}></animated.span>}
                  </ScrollIndicatorSpring>
                </div>
              </div>
              <div className={styles.cta_content}>
                <p className={styles.cta_content_title}>{slides[0].ctaTitle}</p>
                <p className={styles.cta_content_headline}>
                  {slides[0].ctaHeadline}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default Lab1;
