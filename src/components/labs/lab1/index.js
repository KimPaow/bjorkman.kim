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
  const [activeSlide, setActiveSlide] = useState(0);
  let prev = null;
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

  const handleNavigation = e => {
    if (e.deltaY < 0) {
      console.log("scrolling up");
    } else if (e.deltaY > 0) {
      console.log("scrolling down");
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    window.addEventListener("wheel", e => handleNavigation(e));

    return () => {
      window.removeEventListener("wheel", e => handleNavigation(e));
    };
  }, []);

  let {
    mainImg,
    img,
    title,
    subtitle,
    linkText,
    ctaTitle,
    ctaHeadline
  } = slides[activeSlide];

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
              <a href="/labs">HOME</a>
            </li>
            <li>
              <a href="/labs">ABOUT US</a>
            </li>
            <li>
              <a href="/labs">PORTFOLIO</a>
            </li>
            <li>
              <a href="/labs">CONTACT</a>
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
                src={mainImg}
                alt="man on subway"
              />
            </div>
            <img className={styles.previewImg} src={img} alt="portrait" />
            <div className={styles.textContent}>
              <h1>
                {/* Video & Sound */}
                {title}
                <br />
                <span>{subtitle}</span>
              </h1>
              <a className={styles.textContentLink} href="/labs">
                {linkText}
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
                <p className={styles.cta_content_title}>{ctaTitle}</p>
                <p className={styles.cta_content_headline}>{ctaHeadline}</p>
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
