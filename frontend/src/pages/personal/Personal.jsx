import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../style/pages/personal/personal.css";

import { getUserByID, updateUser } from "../../redux/request/userRequest";

import Navigation from "../../layout/navigation/Navigation";
import PersonalBody from "./PersonalBody";
import PersonalGeneralInfo from "./PersonalGeneralInfo";
import PersonalHeader from "./PersonalHeader";
import PersonalNavbarProfile from "./PersonalNavbarProfile";
import NotFound from "../notFound/NotFound";
import ConfirmDialog from "../../components/ConfirmDialog";

function Personal({ socket }) {
    const userRoute = useParams().userID;
    const [userRoutePage, setUserRoutePage] = useState({});
    const [user, setUser] = useState({
        bio: "",
    });
    const [isValid, setIsValid] = useState(true);
    const [active, setActive] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUserByID(userRoute, dispatch)
            .then((data) => {
                setIsValid(true);
                setUserRoutePage(data.user);
                const { bio } = data.user;

                setUser({
                    bio: bio,
                });
            })
            .catch((err) => {
                setIsValid(false);
                console.error("User is not valid", err);
            });
    }, [userRoute, dispatch]);

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const onUpdateBioPopup = () => {
        setActive("UPDATE_BIO");
    };

    const handleUpdateBio = () => {
        getUserByID(currentUser._id, dispatch).then((data) => {
            const { bio } = data.user;
            setIsLoading(true);

            if (bio !== user.bio) {
                const updatedUser = {
                    userID: currentUser._id,
                    bio: user.bio,
                };

                updateUser(updatedUser, dispatch)
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.error("Failed to update user", err);
                    });
            }

            setTimeout(() => {
                setIsLoading(false);
                setActive("");
            }, 1500);
        });
    };

    const renderUpdateBioPopup = () => {
        return (
            active === "UPDATE_BIO" && (
                <ConfirmDialog
                    title="UPDATE BIO"
                    confirmButtonText="Confirm"
                    children={
                        <textarea
                            value={user.bio}
                            style={{
                                resize: "none",
                                width: "30rem",
                                height: "10rem",
                            }}
                            onChange={(e) => setUser({ bio: e.target.value })}
                            className="text-white border-white bg-transparent p-2 scrollbar"
                            spellCheck="false"
                            maxLength={50}
                        />
                    }
                    onConfirm={() => handleUpdateBio()}
                    onClose={() => setActive("")}
                    isLoading={isLoading}
                />
            )
        );
    };

    return isValid ? (
        <div className="position-relative">
            <Navigation title="Login" link="/register" />
            <div className="personal-container">
                <PersonalHeader user={userRoutePage} socket={socket} />
                <PersonalGeneralInfo
                    userRoute={userRoutePage}
                    socket={socket}
                />

                <hr className="my-5" />

                <PersonalNavbarProfile />
                <PersonalBody
                    socket={socket}
                    user={userRoutePage}
                    onUpdateBioPopup={onUpdateBioPopup}
                />
            </div>

            {renderUpdateBioPopup()}
        </div>
    ) : (
        <NotFound />
    );
}

export default Personal;
