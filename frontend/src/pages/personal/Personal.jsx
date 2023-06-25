import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Navigation from "../../layout/navigation/Navigation";

import Body from "./body/Body";
import GeneralInfo from "./header/general-info/GeneralInfo";
import Header from "./header/Header";
import NavbarProfile from "./navbar/NavbarProfile";

import "../../style/pages/personal/personal.css";
import { getUserByID } from "../../redux/request/userRequest";

function Personal() {
    const userID = useParams().userID;
    const [user, setUser] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        getUserByID(userID, dispatch)
            .then((data) => {
                setUser(data.user);
            })
            .catch((err) => {
                console.log("failed", err);
            });
    }, [userID]);

    return (
        <>
            <Navigation title="Login" link="/register" />

            <div className="personal-container">
                <Header user={user} />
                <GeneralInfo user={user} />

                <hr className="my-5" />

                <NavbarProfile />
                <Body user={user} />
            </div>
        </>
    );
}

export default Personal;
