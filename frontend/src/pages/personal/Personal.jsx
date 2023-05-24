import Navigation from "../../layout/navigation/Navigation";

import Body from "./body/Body";
import GeneralInfo from "./header/general-info/GeneralInfo";
import Header from "./header/Header";
import NavbarProfile from "./navbar/NavbarProfile";

import "../../style/pages/personal/personal.css";

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
