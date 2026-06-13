import { useEffect } from "react";
import Portfolio from "./portfolio";

function App() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-DVCK86VKK0");
    }
  }, []);

  return <Portfolio />;
}

export default App;