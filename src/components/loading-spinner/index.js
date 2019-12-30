import React, { useEffect, useState } from "react";
import styles from "./loading-spinner.module.scss";

function LoadingSpinner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <div
      className={styles.spinnerRoot}
      style={isLoaded ? { opacity: 1.0 } : { opacity: 0 }}
    >
      <div className={styles.spinner}>Ö</div>
    </div>
  );
}

export default LoadingSpinner;
