import { useEffect } from "react";
import Portfolio from "./portfolio";

function App() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return <Portfolio />;
}

export default App;