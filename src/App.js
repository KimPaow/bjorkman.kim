import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./components/layout";
import Logo from "./components/logo";
import AnimationRoot from "./components/animation-root";
import Labs from "./components/labs";
import Work from "./components/pages/work";
import About from "./components/pages/about";
import DelayLink from "./components/delay-link";
import styles from "./app.module.scss";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const onDelayStart = (event, to) => {
    console.log("onDelayStart");
  };

  const onDelayEnd = (event, to) => {
    console.log("onDelayEnd");
  };

  return (
    <>
      <Router>
        <Logo />
        {isLoaded ? (
          <div className={styles.header}>
            <Link to="/labs" className={styles.link}>
              The lab.
            </Link>
            <Link className={styles.link} to="/about">
              About.
            </Link>
          </div>
        ) : null}
        <Switch>
          <Route exact path="/">
            <Layout>
              <AnimationRoot />
            </Layout>
          </Route>
          <Route path="/labs">
            <Labs />
          </Route>
          <Route path="/work">
            <Work />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
