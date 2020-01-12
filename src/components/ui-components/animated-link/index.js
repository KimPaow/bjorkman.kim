import React from "react";
import { Link } from "react-router-dom";
import styles from "./animatedlink.module.scss";

export default function AnimatedLink(props) {
  return (
    <Link {...props} className={styles.link}>
      {props.children}
    </Link>
  );
}
