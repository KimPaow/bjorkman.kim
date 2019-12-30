import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import DelayLink from "./components/delay-link";
import styles from "./app.module.scss";
import LoadingSpinner from "./components/loading-spinner";

const AnimationRoot = React.lazy(() => import("./components/animation-root"));
const Logo = React.lazy(() => import("./components/logo"));
const Layout = React.lazy(() => import("./components/layout"));
const Labs = React.lazy(() => import("./components/labs"));
const Work = React.lazy(() => import("./components/pages/work"));
const About = React.lazy(() => import("./components/pages/about"));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}

export default App;
