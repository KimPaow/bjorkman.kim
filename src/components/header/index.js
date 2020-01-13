import React from "react";
import styles from "./header.module.scss";

const Logo = React.lazy(() => import("../logo"));
const AnimatedLink = React.lazy(() => import("../ui-components/animated-link"));

const linkStyle = {
  marginLeft: "3rem"
};

const Header = props => {
  return (
    <>
      <Logo />
      <div className={styles.header}>
        <AnimatedLink data-sticky-cursor style={linkStyle} to="/labs">
          The lab.
        </AnimatedLink>
        <AnimatedLink data-sticky-cursor style={linkStyle} to="/about">
          About.
        </AnimatedLink>
      </div>
    </>
  );
};

export default Header;
