import React from "react";
import { Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("../components/pages/home"));
const About = React.lazy(() => import("../components/pages/about"));
const Work = React.lazy(() => import("../components/pages/work"));
const Labs = React.lazy(() => import("../components/labs"));
const Lab1 = React.lazy(() => import("../components/labs/lab1"));
const Lab2 = React.lazy(() => import("../components/labs/lab2"));
const Lab3 = React.lazy(() => import("../components/labs/lab3"));
const Lab4 = React.lazy(() => import("../components/labs/lab4"));
const Lab5 = React.lazy(() => import("../components/labs/lab5"));

const ROUTES = [
  {
    path: "/",
    key: "APP_ROOT",
    component: RenderRoutes,
    routes: [
      {
        path: "/",
        key: "APP_INDEX",
        exact: true,
        component: () => <Home />
      },
      {
        path: "/about",
        key: "ABOUT",
        exact: true,
        component: () => <About />
      },
      {
        path: "/work",
        key: "WORK",
        exact: true,
        component: () => <Work />
      },
      {
        path: "/labs",
        key: "LABS_ROOT",
        component: RenderRoutes,
        routes: [
          {
            path: "/labs",
            key: "LABS_INDEX",
            exact: true,
            component: () => <Labs />
          },
          {
            path: "/labs/1",
            key: "LABS_1",
            exact: true,
            component: () => <Lab1 />
          },
          {
            path: "/labs/2",
            key: "LAB_2",
            exact: true,
            component: () => <Lab2 />
          },
          {
            path: "/labs/3",
            key: "LAB_3",
            exact: true,
            component: () => <Lab3 />
          },
          {
            path: "/labs/4",
            key: "LAB_4",
            exact: true,
            component: () => <Lab4 />
          },
          {
            path: "/labs/5",
            key: "LAB_5",
            exact: true,
            component: () => <Lab5 />
          }
        ]
      }
    ]
  }
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route path={route.path} exact={route.exact}>
      <route.component routes={route.routes} />
    </Route>
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
