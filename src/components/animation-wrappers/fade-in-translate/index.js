import React, { useEffect, useState } from "react";
import { useTrail, animated, config } from "react-spring";
import PropTypes from "prop-types";

export default function FadeInTranslate(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  const fadeInMatrix = useTrail(props.children.length, {
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded
      ? "matrix(1.00,0.00,0.00,1.00,0,0)"
      : "matrix(1, 0.05, -0.05, 1, 0, 50)",
    from: { opacity: 0, transform: "matrix(1, 0.05, -0.05, 1, 0, 50)" }
  });

  const fadeInUp = useTrail(props.children.length, {
    config: config.gentle,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? "translateY(0)" : "translateY(10px)",
    from: { opacity: 0, transform: "translateY(10px)" }
  });

  let trail = fadeInMatrix;

  if (props.fade_up) {
    trail = fadeInUp;
  }
  if (props.fade_matrix) {
    trail = fadeInMatrix;
  }

  useEffect(() => {
    console.log("isloaded useeffect");
    setIsLoaded(true);
  }, []);

  // useEffect(() => {
  //   console.log("callback useeffect");
  //   if (props.post_load) {
  //     props.post_load();
  //   }
  // }, [props]);
  console.log("repaint");
  return isLoaded
    ? trail.map((trailstyle, index) => {
        const child = props.children[index];
        const AnimatedChild = animated(child.type);
        return (
          <AnimatedChild
            style={trailstyle}
            className={child.props.className}
            key={index}
          >
            {child.props.children}
          </AnimatedChild>
        );
      })
    : null;
}

FadeInTranslate.propTypes = {
  fade_matrix: PropTypes.bool,
  fade_up: PropTypes.bool,
  post_load: PropTypes.func
};
