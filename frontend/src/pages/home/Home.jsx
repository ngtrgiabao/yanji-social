import { Suspense, lazy } from "react";

import "../../style/pages/home/home.css";

import HomeLeft from "./HomeLeft";
import HomeMiddle from "./HomeMiddle";

const Navigation = lazy(() => import("../../layout/navigation/Navigation"));

const Home = ({ socket }) => {
    return (
        <>
            <Suspense fallback={null}>
                <Navigation title="Login" link="/login" />
            </Suspense>

            <main>
                <div className="container">
                    <HomeLeft socket={socket} />
                    <HomeMiddle socket={socket} />
                </div>
            </main>
        </>
    );
};

export default Home;
