import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "../../style/pages/personal/personal.css";

import { getUserByID } from "../../redux/request/userRequest";

import Navigation from "../../layout/navigation/Navigation";
import PersonalBody from "./PersonalBody";
import PersonalGeneralInfo from "./PersonalGeneralInfo";
import PersonalHeader from "./PersonalHeader";
import PersonalNavbarProfile from "./PersonalNavbarProfile";
import NotFound from "../notFound/NotFound";

function Personal() {
    const userID = useParams().userID;
    const [user, setUser] = useState({});
    const [isValid, setIsValid] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserByID(userID, dispatch)
            .then((data) => {
                setIsValid(true);
                setUser(data.user);
            })
            .catch((err) => {
                setIsValid(false);
                console.error("User is not valid", err);
            });
    }, [userID, dispatch]);

    return isValid ? (
        <>
            <Navigation title="Login" link="/register" />

            <div className="personal-container">
                <PersonalHeader user={user} />
                <PersonalGeneralInfo user={user} />

                <hr className="my-5" />

                <PersonalNavbarProfile />
                <PersonalBody user={user} />
            </div>
        </>
    ) : (
        <NotFound />
    );
}

export default Personal;
