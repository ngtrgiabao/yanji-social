import { useState, useEffect, useCallback } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    faUserPlus,
    faWifi,
    faPlus,
    faUserGroup,
    faUserCheck,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

import { getUserByID, updateUser } from "../../redux/request/userRequest";

//TODO CREATE USER WAITTING LIST AND UPDATE BUTTON ADD FRIEND IN REALTIME

const PersonalAvatarFriends = ({ user, socket }) => {
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);
    const userRoutePage = useParams().userID;
    const [isApprover, setIsApprover] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [isFriendRequestPending, setIsFriendRequestPending] = useState(false);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleAddFriend = () => {
        socket = io(SOCKET_URL);

        socket.emit("add-friend", {
            // add author of current account to update friendRequests list
            userID: currentUser._id,
            // add user route page to checking is this user send request?
            userRoute: userRoutePage,
            isPending: true,
            isFriend: false,
        });
    };

    const handleAcceptFriend = () => {
        getUserByID(currentUser._id, dispatch).then((data) => {
            const { friendRequests, friends } = data.user;

            // checking user route page to update friend list if author of current account accept user who send request, by compare userRoutePage with user in friendRequests list
            const updateFriends = friendRequests.find(
                (u) => u === userRoutePage
            );

            // Update friend list of user who sent request to friend if that user accept request
            const updateUserSentRequest = {
                userID: currentUser._id,
                friends: [updateFriends, ...friends],
            };

            updateUser(updateUserSentRequest, dispatch)
                .then(() => {
                    console.log("Added friend successfully");
                })
                .catch((err) => {
                    console.error("Failed to accept friend", err);
                });
        });

        getUserByID(userRoutePage, dispatch).then((data) => {
            const { friends } = data.user;
            // Update friend list of user who accept friend request
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

        socket = io(SOCKET_URL);

        socket.emit("add-friend", {
            isFriend: true,
        });

        setIsApprover(false);
    };

    const handleSocket = {
        addFriend: useCallback(
            (data) => {
                const { userRoute, isPending, isFriend } = data;

                userRoute === userRoutePage &&
                    // userRoutePage now is friend route
                    getUserByID(userRoutePage, dispatch).then((data) => {
                        const { friendRequests } = data.user;
                        const newUpdateUser = {
                            userID: userRoutePage,
                        };

                        // add user who send friend request to friendRequests
                        newUpdateUser.friendRequests = [
                            currentUser._id,
                            ...friendRequests,
                        ];

                        updateUser(newUpdateUser, dispatch)
                            .then(() => {
                                console.log("Sent friend request successfully");
                                setIsFriendRequestPending(true);
                            })
                            .catch((err) => {
                                console.error(
                                    "Failed to send friend request",
                                    err
                                );
                            });
                    });

                isFriend &&
                    setIsFriend(true) &&
                    setIsFriendRequestPending(false) &&
                    setIsApprover(false);

                //TODO FIX CANNOT CHANGE CONTENT FROM APPROVER TO FRIEND WHEN ACCEPT REQUEST OF APPROVER
                if (userRoute === currentUser._id) {
                    setIsApprover(true);
                }
            },
            [currentUser._id, dispatch, userRoutePage]
        ),
    };

    useEffect(() => {
        console.log(
            "isFriendRequestPending",
            isFriendRequestPending,
            "approver",
            isApprover
        );
    }, [isFriendRequestPending, isApprover]);

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("added-friend", handleSocket.addFriend);

        return () => {
            socket.off("added-friend", handleSocket.addFriend);
        };
    }, [SOCKET_URL, handleSocket.addFriend]);

    // Check user is approver ?
    useEffect(() => {
        let isCancelled = false;

        getUserByID(currentUser._id, dispatch).then((data) => {
            if (!isCancelled) {
                const { friendRequests, friends } = data.user;
                if (friendRequests.length > 0) {
                    const checkIsApprover = friendRequests.some(
                        (u) => u === userRoutePage
                    );

                    checkIsApprover && setIsApprover(true);
                }

                getUserByID(userRoutePage, dispatch).then((data) => {
                    const { friendRequests } = data.user;

                    const isRequestFriend = friendRequests.includes(
                        currentUser._id
                    );
                    const isFriend = friends.includes(userRoutePage);

                    setIsFriendRequestPending(isRequestFriend);
                    setIsFriend(isFriend);
                });
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUser._id, dispatch, userRoutePage, isFriend]);

    // Get random avatars of friend
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
        // const isFriendRequestPending = isAddFriend && !isCurrentUser;

        let icon, label, handleClick;

        // author of current account who can accept friend request
        if (isApprover) {
            icon = faUserGroup;
            label = "Accept";
            handleClick = handleAcceptFriend;
        }
        // user who send friend request
        else if (isFriendRequestPending) {
            icon = faRotateRight;
            label = "Pending accept";
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
                className="add-stories w-100 d-flex text-white justify-content-center align-items-center text-center py-3 fs-5 me-2"
                onClick={handleClick}
            >
                <span className="me-3 fs-4">
                    {isFriendRequestPending ? (
                        <FontAwesomeIcon icon={icon} spin />
                    ) : (
                        <FontAwesomeIcon icon={icon} />
                    )}
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
                className="d-flex edit-profile"
                style={{
                    width: "calc(15% * 2)",
                }}
            >
                {renderAddFriendBtn()}
                <div className="d-flex align-items-center justify-content-center edit-profile-page text-light py-3 fs-5 w-100 border">
                    {user._id === currentUser._id ? (
                        <>
                            <span>
                                <UilPen />
                            </span>
                            <span className="ms-2">Edit profile</span>
                        </>
                    ) : (
                        <>
                            <span
                                className="me-3"
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
