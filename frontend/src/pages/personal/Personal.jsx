import React from "react";

import Navigation from "../../components/navigation/Navigation";

import Body from "./body/Body";
import GeneralInfo from "./header/generalInfo/GeneralInfo";
import Header from "./header/Header";
import NavbarProfile from "./navbar/NavbarProfile";

import "./personnal.css";

function Personal() {
    return (
        <>
            <Navigation title="Login" link="/register" />

            <div className="personal-container">
                <Header />
                <GeneralInfo />

                <hr className="my-5" />

                <NavbarProfile />
                <Body />
            </div>
        </>
    );
}

export default Personal;
