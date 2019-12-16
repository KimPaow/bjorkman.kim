import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout";
import AnimationRoot from "./components/animation-root";
import Labs from "./components/labs";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            <AnimationRoot />
          </Layout>
        </Route>
        <Route path="/labs">
          <Labs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
