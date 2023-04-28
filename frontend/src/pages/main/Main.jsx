import React from "react";

import "../../style/pages/main/main.css";
import Navigation from "../../components/navigation/Navigation";

import Left from "./sidebar/left/Left";
import Middle from "./sidebar/middle/Middle";
import Right from "./sidebar/right/Right";

const Main = () => {
    return (
        <>
            <Navigation title="Login" link="/register" />

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

export default Main;
