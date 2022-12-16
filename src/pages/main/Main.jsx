import React from "react";

import "./main.css";
import Navigation from "../../components/navigation/Navigation";

import Left from "../../components/sidebar/left/Left";
import Middle from "../../components/sidebar/middle/Middle";
import Right from "../../components/sidebar/right/Right";

const Sidebar = () => {
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

export default Sidebar;
