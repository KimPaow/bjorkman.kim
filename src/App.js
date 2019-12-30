import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import DelayLink from "./components/delay-link";
import LoadingSpinner from "./components/loading-spinner";
import Layout from "./components/layout";

const AnimationRoot = React.lazy(() => import("./components/animation-root"));
const Labs = React.lazy(() => import("./components/labs"));
const Work = React.lazy(() => import("./components/pages/work"));
const About = React.lazy(() => import("./components/pages/about"));
const Header = React.lazy(() => import("./components/header"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <AnimationRoot />
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
    </Layout>
  );
}

export default App;
