import { Suspense, lazy } from "react";

import "../../style/pages/home/home.css";

import Left from "./sidebar/left/Left";
import Middle from "./sidebar/middle/Middle";

const Navigation = lazy(() => import("../../layout/navigation/Navigation"));

const Home = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Navigation title="Login" link="/register" />
            </Suspense>

            <main>
                <div className="container">
                    <Left />
                    <Middle />
                </div>
            </main>
        </>
    );
};

export default Home;
