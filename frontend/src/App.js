import { lazy, useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

import "animate.css";

import { NetworkError } from "./pages";
import Route from "./routes";
const InvalidScreen = lazy(
  () => import("./components/business/invalid-screen"),
);

function App() {
  const [isNetworkWorking, setIsNetworkWorking] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsNetworkWorking(true);
    };

    const handleOffline = () => {
      setIsNetworkWorking(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isNetworkWorking]);

  return (
    <>
      {isMobile || isTablet ? (
        <InvalidScreen />
      ) : (
        <div className="App">
          {isNetworkWorking ? <Route /> : <NetworkError />}
        </div>
      )}
    </>
  );
}

export default App;
