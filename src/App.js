import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import LoadingSpinner from "./components/loading-spinner";
import Layout from "./components/layout";
import ROUTES, { RenderRoutes } from "./configs/routes";

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
          <RenderRoutes routes={ROUTES} />
        </Router>
      </Suspense>
    </Layout>
  );
}

export default App;
