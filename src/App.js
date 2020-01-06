import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
// import DelayLink from "./components/delay-link";
import LoadingSpinner from "./components/loading-spinner";
import Layout from "./components/layout";

const AnimationRoot = React.lazy(() => import("./components/animation-root"));
const Labs = React.lazy(() => import("./components/labs"));
const Work = React.lazy(() => import("./components/pages/work"));
const About = React.lazy(() => import("./components/pages/about"));
const Header = React.lazy(() => import("./components/header"));

const history = createBrowserHistory();

ReactGA.initialize("UA-139665482-1");

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Router history={history}>
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
