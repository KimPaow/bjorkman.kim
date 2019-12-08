import React, { useEffect } from "react";
import Webfont from "webfontloader";
// import anime from "animejs/lib/anime.es.js";
import styles from "./animation-root.module.scss";
import * as PIXI from "pixi.js";

let mount = {};
let app = {};
const domSize = {
  x: window.innerWidth,
  y: window.innerHeight
};
const verticalCenter = domSize.y / 2;
const horizontalCenter = domSize.x / 2;
const fontsize = 200;
const colors = {
  primary: "0x222",
  secondary: "0xf0f0f0",
  accent: "0xc70025"
};
const rectangle = new PIXI.Graphics();

const init = function() {
  // CREATE APPLICATION
  app = new PIXI.Application({
    width: domSize.x,
    height: domSize.y,
    transparent: true,
    autoResize: true,
    resizeTo: window,
    resolution: window.devicePixelRatio || 1
  });

  mount.appendChild(app.view);

  // CREATE OBJECTS
  const firstIntroText = new PIXI.Text("クリエーティブ", {
    fontFamily: "Noto Sans JP",
    fontSize: fontsize,
    fill: colors.primary,
    align: "left",
    fontWeight: 900
  });

  const secondIntroText = new PIXI.Text("プログラマー", {
    fontFamily: "Noto Sans JP",
    fontSize: fontsize,
    fill: colors.primary,
    align: "left",
    fontWeight: 900
  });

  rectangle.beginFill(colors.accent);
  rectangle.drawRect(0, 0, domSize.x, domSize.y);
  rectangle.endFill();

  firstIntroText.position.set(horizontalCenter, verticalCenter - 150);
  secondIntroText.position.set(domSize.x, verticalCenter - 150);
  app.stage.addChild(rectangle, firstIntroText, secondIntroText);
};

const resize = () => {
  // app.renderer.resize(window.innerdomSize.x, window.innerdomSize.y);

  // You can use the 'screen' property as the renderer visible
  // area, this is more useful than view.domSize.x/domSize.y because
  // it handles resolution
  rectangle.width = domSize.x;
  rectangle.height = domSize.y;
  rectangle.position.set(0);
};

const onScroll = () => {};

const AnimationRoot = props => {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Noto Sans JP:700,900"]
        // families: ["Snippet"]
      },
      active() {
        init();
      }
    });

    window.addEventListener("resize", resize);
    window.addEventListener("onscroll", onScroll);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("onscroll", onScroll);
    };
  });

  return (
    <div
      className={styles.root}
      ref={ref => {
        mount = ref;
      }}
    >
      <div className={styles.scrollcontent}>
        <div
          className={styles.content}
          style={{ fontFamily: "Noto Sans JP", fontWeight: 900, fontSize: 100 }}
        >
          Sunny at Sea
        </div>
      </div>
    </div>
  );
};

export default AnimationRoot;
