import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import Logo from "../logo";

const Header = props => {
  return (
    <>
      <Logo />
      <div className={styles.header}>
        <Link to="/labs" className={styles.link}>
          The lab.
        </Link>
        <Link className={styles.link} to="/about">
          About.
        </Link>
      </div>
    </>
  );
};

export default Header;
