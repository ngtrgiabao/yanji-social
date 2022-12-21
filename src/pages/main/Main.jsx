import React from "react";

import "./main.css";
import Navigation from "../../components/navigation/Navigation";

import Left from "../../components/sidebarMainPage/left/Left";
import Middle from "../../components/sidebarMainPage/middle/Middle";
import Right from "../../components/sidebarMainPage/right/Right";

const Main = () => {
    return (
        <>
            <Navigation />

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
