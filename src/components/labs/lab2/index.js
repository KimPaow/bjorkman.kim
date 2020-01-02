import React, { useEffect, useState } from "react";
import styles from "./lab.module.scss";
import ImageDistort from "react-image-list-distort";
import Switch from "../../ui/switch";

function Lab2() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.root}>
      <p className={styles.no_mobile}>
        This lab is only available on desktop for now.
      </p>
      {/* <div className={styles.controls}>
        <Switch isOn={value} handleToggle={() => setValue(!value)}></Switch>
      </div> */}
      <div className={styles.listContainer}>
        <ul className={styles.listRoot}>
          <li className={styles.listItem} key="3">
            <img src="/onecup.jpg" />
            <p>
              <span>三·</span>ワンカップ
              <br />
            </p>
          </li>
          <li className={styles.listItem} key="2">
            <img src="/ramen.jpg" />
            <p>
              <span>二·</span>ラーメン
              <br />
            </p>
          </li>
          <li className={styles.listItem} key="1">
            <img src="/curry.jpg" />
            <p>
              <span>一·</span>カレー
              <br />
            </p>
          </li>
        </ul>
      </div>
      <ImageDistort
        styles={{ zIndex: -10 }}
        listRoot={`.${styles.listRoot}`}
        itemRoot={"li"}
        options={{
          strength: 0.45,
          effect: "redshift",
          geometry: {
            shape: "circle",
            radius: 0.4
          }
        }}
      ></ImageDistort>
    </div>
  ) : null;
}

export default Lab2;
