import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

import { followUser, getUserByID } from "../../redux/request/userRequest";
import { createRoom } from "../../redux/request/roomRequest";

//TODO CREATE USER WAITTING LIST

const PersonalAvatarFriends = ({ userRoutePage, socket }) => {
    const [isFollow, setIsFollow] = useState(false);
    const [isApprover, setIsApprover] = useState(false);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleFollow = () => {
        const updatedUser = {
            userID: userRoutePage._id,
            newFollower: currentUser._id,
        };

        followUser(updatedUser, dispatch)
            .then((data) => {
                const { userAccept, userRequest } = data.data;

                socket = io(SOCKET_URL);

                socket.emit("follow", {
                    // add author of current account to update friendRequests list
                    sender: userRequest._id,
                    // add user route page to checking is this user send request?
                    userRoute: userAccept._id,
                });
            })
            .catch((err) => {
                console.error("Failed to follow", err);
            });
    };

    const handleUserGotFollowed = (sender, userRoute) => {
        getUserByID(userRoute, dispatch).then((data) => {
            const { followers, followings } = data.user;

            const isFollower = followers.includes(sender);
            const isFollowing = followings.includes(sender);

            // If got request follow will active isApprover
            if (isFollower) {
                setIsApprover(true);
            }

            // If user who got followed also following user who sent follow will set isApprover to false and set isFollow is true
            if (isFollowing) {
                setIsApprover(false);
                setIsFollow(true);
            } else {
                // Check is user who sent follow still follow ?
                getUserByID(sender, dispatch).then((data) => {
                    const { followings } = data.user;

                    const isFollowing = followings.includes(userRoute);

                    // If both user not follow each other will set to default btn
                    if (!isFollowing) {
                        setIsApprover(false);
                        setIsFollow(false);
                    }
                });
            }
        });
    };

    const handleUserSendFollow = (sender, userRoute) => {
        getUserByID(sender, dispatch).then((data) => {
            const { followings } = data.user;

            const isFollowing = followings.includes(userRoute);

            if (isFollowing) {
                setIsApprover(false);
                setIsFollow(true);
            } else {
                // Check is user who sent follow still follow ?
                getUserByID(userRoute, dispatch).then((data) => {
                    const { followings } = data.user;

                    const isFollowing = followings.includes(sender);

                    if (isFollowing) {
                        setIsApprover(true);
                    } else {
                        setIsApprover(false);
                        setIsFollow(false);
                    }
                });
            }
        });
    };

    const handleSocket = {
        follow: useCallback(async (data) => {
            const { userRoute, sender } = data;

            if (userRoute === currentUser._id) {
                handleUserGotFollowed(sender, userRoute);
            }

            if (sender === currentUser._id) {
                handleUserSendFollow(sender, userRoute);
            }
        }, []),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("followed", handleSocket.follow);

        return () => {
            socket.off("followed", handleSocket.follow);
        };
    }, [SOCKET_URL, handleSocket.follow]);

    // Check user is approver ?
    useEffect(() => {
        let isCancelled = false;

        getUserByID(currentUser._id, dispatch).then((data) => {
            if (!isCancelled) {
                const { followers, followings } = data.user;

                const checkIsApprover = followers.some(
                    (u) => u === userRoutePage._id
                );
                const checkIsFollowedBack = followings.some(
                    (u) => u === userRoutePage._id
                );

                checkIsApprover && !checkIsFollowedBack && setIsApprover(true);

                getUserByID(userRoutePage._id, dispatch).then(() => {
                    const isFollowing = followings.includes(userRoutePage._id);

                    setIsFollow(isFollowing);
                });
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUser._id, dispatch, userRoutePage._id]);

    const renderFollowBtn = () => {
        const isCurrentUser = userRoutePage._id === currentUser._id;

        let icon, label, handleClick;

        // author of current account who can accept friend request
        if (isApprover) {
            label = "Follow back";
            handleClick = handleFollow;
        }
        // user who author of current account
        else if (isCurrentUser) {
            label = "Add stories";
            handleClick = null;
        } else if (isFollow) {
            label = "Following";
            handleClick = handleFollow;
        }
        // user who not friend
        else {
            label = "Follow";
            handleClick = handleFollow;
        }

        return (
            <div
                className="add-stories text-white py-1 px-4 d-flex justify-content-center align-items-center"
                onClick={handleClick}
            >
                {label}
            </div>
        );
    };

    const createNewMsg = () => {
        const roomInfo = {
            sender: currentUser._id,
            receiver: userRoutePage._id,
            name: "Hello",
        };

        createRoom(dispatch, roomInfo);
    };

    return (
        <div className="w-100 d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
                {userRoutePage._id !== currentUser._id && (
                    <Link
                        to="/messages"
                        className="rounded rounded-circle d-flex justify-content-center align-items-center me-3 msg-btn"
                        title="Message"
                        onClick={createNewMsg}
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="fs-3" />
                    </Link>
                )}
                {renderFollowBtn()}
            </div>
        </div>
    );
};

export default PersonalAvatarFriends;
