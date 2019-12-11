import React, { useEffect, useState } from "react";

function Parallax() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <h1>Parallax</h1>
  ) : (
    <h1 style={{ color: "black", fontSize: "100px" }}>Loading...</h1>
  );
}

export default Parallax;