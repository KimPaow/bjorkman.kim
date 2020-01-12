import React, { useEffect, useState } from "react";
import styles from "./lab.module.scss";
import ImageDistort from "react-image-list-distort";
import Slider from "react-input-slider";
import { useTrail, animated, config } from "react-spring";

function Lab2() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [strength, setStrength] = useState(0.5);
  const [radius, setRadius] = useState(0.5);
  const [effect, setEffect] = useState("redshift");
  const [shape, setShape] = useState("circle");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const children = [
    <>
      <img src="/onecup.jpg" alt="onecup sake" />
      <p>
        <span>三·</span>ワンカップ
        <br />
      </p>
    </>,
    <>
      <img src="/ramen.jpg" alt="good looking ramen" />
      <p>
        <span>二·</span>ラーメン
        <br />
      </p>
    </>,
    <>
      <img src="/curry.jpg" alt="japanese curry" />
      <p>
        <span>一·</span>カレー
        <br />
      </p>
    </>
  ];

  const trail = useTrail(children.length, {
    config: config.gentle,
    opacity: isLoaded ? 1 : 0
  });

  const createList = (children, trail) => {
    return trail.map((props, index) => (
      <animated.li className={styles.listItem} key={index} style={props}>
        {children[index]}
      </animated.li>
    ));
  };

  const sliderStyles = {
    track: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    active: {
      backgroundColor: "#f0f0f0"
    },
    thumb: {
      backgroundColor: "rgb(23, 26, 27)",
      boxShadow: "0 0 0 0.2rem #f0f0f0",
      width: 20,
      height: 20
    }
  };

  return isLoaded ? (
    <div className={styles.root}>
      <p className={styles.no_mobile}>
        This lab is only available on desktop for now.
      </p>
      <div className={styles.listContainer}>
        <ul className={styles.listRoot}>{createList(children, trail)}</ul>
      </div>
      <div className={styles.controls}>
        <div className={styles.controls_item}>
          <label className={styles.controls_item_label}>{`Strength | ${Number(
            strength
          ).toFixed(2)}`}</label>
          <Slider
            styles={sliderStyles}
            xstep={0.01}
            xmax={1}
            xmin={0}
            x={strength}
            onChange={({ x }) => setStrength(x)}
          />
        </div>
        <div className={styles.controls_item}>
          <label className={styles.controls_item_label}>{`Radius | ${Number(
            radius
          ).toFixed(2)}`}</label>
          <Slider
            styles={sliderStyles}
            xstep={0.01}
            xmax={1}
            xmin={0}
            x={radius}
            onChange={({ x }) => setRadius(x)}
          />
        </div>
        <div className={styles.controls_item}>
          <label className={styles.controls_item_label}>Effect</label>
          <button
            onClick={() => setEffect("redshift")}
            style={effect === "redshift" ? { opacity: 1 } : { opacity: 0.6 }}
          >
            Redshift.
          </button>
          <span className={styles.button_divider}>|</span>
          <button
            onClick={() => setEffect("stretch")}
            style={effect === "stretch" ? { opacity: 1 } : { opacity: 0.6 }}
          >
            Stretch.
          </button>
        </div>
        <div className={styles.controls_item}>
          <label className={styles.controls_item_label}>Shape</label>
          <button
            onClick={() => setShape("circle")}
            style={shape === "circle" ? { opacity: 1 } : { opacity: 0.6 }}
          >
            Circle.
          </button>
          <span className={styles.button_divider}>|</span>
          <button
            onClick={() => setShape("plane")}
            style={shape === "plane" ? { opacity: 1 } : { opacity: 0.6 }}
          >
            Plane.
          </button>
        </div>
      </div>
      <ImageDistort
        styles={{ zIndex: -10, height: "100vh", width: "100vw" }}
        listRoot={`.${styles.listRoot}`}
        itemRoot={"li"}
        options={{
          strength: strength,
          effect: effect,
          geometry: {
            shape: shape,
            radius: radius
          }
        }}
      ></ImageDistort>
    </div>
  ) : null;
}

export default Lab2;
