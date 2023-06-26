import { useState, useEffect } from "react";
import { UilPlusCircle, UilPen } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { faUserPlus, faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

const PersonalAvatarFriends = ({ user }) => {
    // GET RANDOM AVATAR FRIENDS IN PERSONAL PAGE
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        let isCancelled = false;

        const getFriendsAvatar = async () => {
            try {
                const avatar = await axios.get(
                    "https://randomuser.me/api/?results=9"
                );
                let avatars = [];

                avatar.data.results.forEach((friend) => {
                    avatars.push({
                        id: friend.login.uuid,
                        avatar: friend.picture.large,
                    });
                });

                setRandomAvatarFriends(avatars);
            } catch (error) {
                console.error("Failed to get user data", error);
            }
        };

        if (!isCancelled) {
            getFriendsAvatar();
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    const renderRandomAvatarFriends = () => {
        return randomAvatarFriends.map((item, index) => (
            <div key={item.id} className="rounded-circle avatar-friends">
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={item.avatar}
                    alt="Avatar user"
                    className="rounded-circle"
                />
            </div>
        ));
    };

    return (
        <div className="tools d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between">
                {renderRandomAvatarFriends()}
            </div>

            <div className="d-flex flex-wrap edit-profile">
                <div className="add-stories me-3 d-flex align-items-center text-light text-center">
                    {user._id === currentUser._id ? (
                        <span className="me-2">
                            <UilPlusCircle />
                        </span>
                    ) : (
                        <span className="me-2">
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                    )}
                    <span className="d-block">
                        {user._id === currentUser._id
                            ? "Add stories"
                            : "Add friend"}
                    </span>
                </div>
                <div className="d-flex align-items-center edit-profile-page text-light border">
                    {user._id === currentUser._id ? (
                        <>
                            <span>
                                <UilPen />
                            </span>
                            <span className="ms-2">Edit profile page</span>
                        </>
                    ) : (
                        <>
                            <span
                                className="me-2"
                                style={{
                                    transform: "rotate(45deg)",
                                }}
                            >
                                <FontAwesomeIcon icon={faWifi} />
                            </span>
                            <span>Follow</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalAvatarFriends;
