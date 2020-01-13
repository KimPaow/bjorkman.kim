import React from "react";
import styles from "./hide-in-states.module.scss";

// Props (all bools):
// mobile
// tablet
// desktop
// widescreen

// Hides children in all states from the specified prop state and up
// Provides a fallback visible below desktop size specific to my needs on this website.
export default function HideInStateAndUp(props) {
  const createClasses = props => {
    let classes = [];
    if (props.mobile) {
      classes.push(styles.hide_mobile);
    }
    if (props.tablet) {
      classes.push(styles.hide_tablet);
    }
    if (props.desktop) {
      classes.push(styles.hide_desktop);
    }
    if (props.widescreen) {
      classes.push(styles.hide_widescreen);
    }
    return classes;
  };

  const classes = createClasses(props);

  const StyledChildren = () =>
    React.Children.map(props.children, child =>
      React.cloneElement(child, {
        className: `${child.props.className} ${classes.join(" ")}`
      })
    );

  const fallBack = (
    <p className={`${styles.fallback} ${classes.join(" ")}`}>
      This lab is only available on desktop for now.
    </p>
  );

  return props.children ? <StyledChildren /> : fallBack;
}

export function ShowInStateAndUp(props) {
  const createClasses = props => {
    let classes = [];
    if (props.mobile) {
      classes.push(styles.show_mobile);
    }
    if (props.tablet) {
      classes.push(styles.show_tablet);
    }
    if (props.desktop) {
      classes.push(styles.show_desktop);
    }
    if (props.widescreen) {
      classes.push(styles.show_widescreen);
    }
    return classes;
  };

  const classes = createClasses(props);

  const StyledChildren = () =>
    React.Children.map(props.children, child =>
      React.cloneElement(child, {
        className: `${child.props.className} ${classes.join(" ")}`
      })
    );

  return props.children ? <StyledChildren /> : null;
}
