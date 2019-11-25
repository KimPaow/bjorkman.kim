import React from "react";
import styles from "./layout.module.scss";

const Layout = props => {
  return <div className={styles.root}>{props.children}</div>;
};

export default Layout;
