import React, { useEffect, useState } from "react";
import styles from "./lab.module.scss";

function Lab4() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className={styles.root}>
      <p className={styles.no_mobile}>
        This lab is only available on desktop for now.
      </p>
    </div>
  ) : null;
}

export default Lab4;
