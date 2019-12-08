import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import AnimationRoot from "./components/animation-root";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <Layout>
      <AnimationRoot></AnimationRoot>
    </Layout>
  ) : (
    <h1 style={{ color: "black", fontSize: "100px" }}>Loading...</h1>
  );
}

export default App;
