import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../loading-spinner";

function Parallax() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return isLoading ? <h1>Parallax</h1> : <LoadingSpinner />;
}

export default Parallax;
