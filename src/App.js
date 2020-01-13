import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import Helmet from "react-helmet";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import LoadingSpinner from "./components/loading-spinner";
import Layout from "./components/layout";
import ROUTES, { RenderRoutes } from "./configs/routes";

const Header = React.lazy(() => import("./components/header"));
const Cursor = React.lazy(() => import("./components/ui-components/cursor"));
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
      <Helmet titleTemplate="%s | Kim Björkman" defaultTitle="Kim Björkman">
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="https://www.kimbjorkman.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Creative Developer | Kim Björkman" />
        <meta
          property="og:description"
          content="Kim Björkman is a creative developer based in Stockholm and Japan. Currently working at Sunny at Sea in Stockholm, Sweden."
        />
        <meta
          name="twitter:title"
          content="Creative Developer | Kim Björkman"
        />
        <meta
          name="twitter:description"
          content="Kim Björkman is a creative developer based in Stockholm and Japan. Currently working at Sunny at Sea in Stockholm, Sweden."
        />
        <meta
          name="description"
          content="Kim Björkman is a creative developer based in Stockholm and Japan. Currently working at Sunny at Sea in Stockholm, Sweden."
        />
        <link rel="apple-touch-icon" href="/appletouch.png" />
      </Helmet>
      <Suspense fallback={<LoadingSpinner />}>
        <Cursor />
        <Router history={history}>
          <Header />
          <RenderRoutes routes={ROUTES} />
        </Router>
      </Suspense>
    </Layout>
  );
}

export default App;
