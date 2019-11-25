import React from "react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>Kim Björkman</div>
    </div>
  );
};

export default Header;
