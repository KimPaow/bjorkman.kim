import React from "react";
import styles from "./header.module.scss";

const Logo = React.lazy(() => import("../logo"));
const AnimatedLink = React.lazy(() => import("../ui-components/animated-link"));

const Header = props => {
  return (
    <>
      <Logo />
      <div className={styles.header}>
        <AnimatedLink to="/labs">The lab.</AnimatedLink>
        <AnimatedLink to="/about">About.</AnimatedLink>
      </div>
    </>
  );
};

export default Header;
