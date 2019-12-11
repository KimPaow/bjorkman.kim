import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styles from "./labs.module.scss";

import Parallax from "./parallax";

function Labs() {
  let { path, url } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <>
      <Switch>
        <Route exact path="/labs">
          <div className={styles.layout}>
            <h1>labs.</h1>
            <ul>
              <li>
                <Link className={styles.link} to={`${url}/1`}>
                  [ Parallax ]
                </Link>
              </li>
            </ul>
          </div>
        </Route>
        <Route path={`${path}/1`}>
          <Parallax />
        </Route>
      </Switch>
    </>
  ) : (
    <h1 style={{ color: "black", fontSize: "100px" }}>Loading...</h1>
  );
}

export default Labs;
