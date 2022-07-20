/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./main.css";

import Left from "../sidebar/left/Left";
import Middle from "../sidebar/middle/Middle";
import Right from "../sidebar/right/Right";

const Sidebar = () => {
    return (
        <main>
            <div className="container">
                <Left />
                <Middle />
                <Right />
            </div>
        </main>
    );
};

export default Sidebar;
