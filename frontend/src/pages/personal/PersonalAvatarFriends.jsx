import { useState, useEffect, useCallback } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import {
    faUserPlus,
    faWifi,
    faArrowRight,
    faPlus,
    faUserGroup,
    faUserCheck,
    faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

import axios from "axios";
import { useParams } from "react-router-dom";
import { getUserByID, updateUser } from "../../redux/request/userRequest";

//TODO CREATE USER WAITTING LIST AND RESOLVE USER OF CURRENT ACCOUNT CAN UPDATE FRIEND LIST WHEN ACCEPT FRIEND REQUEST

const PersonalAvatarFriends = ({ user, socket }) => {
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);
    const userRoutePage = useParams().userID;
    const [isAddFriend, setIsAddFriend] = useState(false);
    const [isApprover, setIsApprover] = useState(false);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleAddFriend = () => {
        socket = io(SOCKET_URL);

        socket.emit("add-friend", {
            // add author of current account to update userWaiting list
            userID: currentUser._id,
            // add user route page to checking is this user send request?
            userRoute: userRoutePage,
        });
    };

    const handleAcceptFriend = () => {
        getUserByID(currentUser._id, dispatch).then((data) => {
            const { userWaiting, friends } = data.user;

            // checking user route page to update friend list if author of current account accept user who send request, by compare userRoutePage with user in userWaiting list
            const updateFriends = userWaiting.find((u) => u === userRoutePage);

            const updateUserSentRequest = {
                userID: currentUser._id,
                friends: [updateFriends, ...friends],
            };

            updateUser(updateUserSentRequest, dispatch)
                .then(() => {
                    console.log("Accepted friend successfully");
                })
                .catch((err) => {
                    console.error("Failed to accept friend", err);
                });
        });

        getUserByID(userRoutePage, dispatch).then((data) => {
            const { friends } = data.user;
            const updateUserAcceptRequest = {
                userID: userRoutePage,
                friends: [currentUser._id, ...friends],
            };

            updateUser(updateUserAcceptRequest, dispatch)
                .then(() => {
                    console.log("Accepted friend successfully");
                })
                .catch((err) => {
                    console.error("Failed to accept friend", err);
                });
        });
    };

    const handleSocket = {
        addFriend: useCallback((data) => {
            const { userRoute } = data;
            userRoute === userRoutePage &&
                // userRoutePage now is friend route
                getUserByID(userRoutePage, dispatch).then((data) => {
                    const { userWaiting } = data.user;
                    const newUpdateUser = {
                        userID: userRoutePage,
                    };

                    // add user who send friend request to userWaiting
                    newUpdateUser.userWaiting = [
                        currentUser._id,
                        ...userWaiting,
                    ];

                    updateUser(newUpdateUser, dispatch)
                        .then(() => {
                            console.log("Sent friend request successfully");
                        })
                        .catch((err) => {
                            console.error("Failed to send friend request", err);
                        });
                });
        }, []),
    };

    const [isFriend, setIsFriend] = useState(false);

    // Check user is approver ?
    useEffect(() => {
        getUserByID(userRoutePage, dispatch).then((data) => {
            const { userWaiting, friends } = data.user;
            const isWaiting = userWaiting.some((u) => u === currentUser._id);
            const isFriend = friends.some((u) => u === currentUser._id);

            if (isWaiting) {
                setIsAddFriend(true);
            }

            if (isFriend) {
                setIsFriend(true);
            }
        });

        getUserByID(currentUser._id, dispatch).then((data) => {
            const { userWaiting } = data.user;
            if (userWaiting.length > 0) {
                const checkIsApprover = userWaiting.some(
                    (u) => u === userRoutePage
                );

                checkIsApprover && setIsApprover(true);
            }
        });
    }, []);

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("added-friend", handleSocket.addFriend);

        return () => {
            socket.off("added-friend", handleSocket.addFriend);
        };
    }, [SOCKET_URL, handleSocket.addFriend]);

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

    const renderAddFriendBtn = () => {
        const isCurrentUser = user._id === currentUser._id;
        const isFriendRequestPending = isAddFriend && !isCurrentUser;

        let icon, label, handleClick;

        // author of current account who can accept friend request
        if (isApprover) {
            icon = faUserGroup;
            label = "Accept";
            handleClick = handleAcceptFriend;
        }
        // user who send friend request
        else if (isFriendRequestPending) {
            icon = faUserGear;
            label = "Waiting accept";
            handleClick = null;
        }
        // user who author of current account
        else if (isCurrentUser) {
            icon = faPlus;
            label = "Add stories";
            handleClick = null;
        } else if (isFriend) {
            icon = faUserCheck;
            label = "Friend";
            handleClick = null;
        }
        // user who not friend
        else {
            icon = faUserPlus;
            label = "Add friend";
            handleClick = handleAddFriend;
        }

        return (
            <div
                className="add-stories me-3 flex-fill d-flex justify-content-center align-items-center text-light text-center py-3 fs-4"
                onClick={handleClick}
            >
                <span className="me-2">
                    <FontAwesomeIcon icon={icon} />
                </span>
                <span className="d-block">{label}</span>
            </div>
        );
    };

    return (
        <div className="tools d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between">
                {renderRandomAvatarFriends()}
            </div>

            <div
                className="d-flex flex-wrap edit-profile"
                style={{
                    width: "25%",
                }}
            >
                {renderAddFriendBtn()}
                <div className="d-flex align-items-center edit-profile-page text-light border py-3 fs-4">
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
