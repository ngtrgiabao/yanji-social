import React, { Suspense, lazy } from "react";

import "../../style/pages/home/home.css";

import Left from "./sidebar/left/Left";
import Middle from "./sidebar/middle/Middle";
import Right from "./sidebar/right/Right";

const Navigation = lazy(() => import("../../components/navigation/Navigation"));

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
                    <Right />
                </div>
            </main>
        </>
    );
};

export default Home;
