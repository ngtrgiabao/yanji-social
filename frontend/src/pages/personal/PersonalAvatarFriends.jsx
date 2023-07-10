import axios from "axios";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

import { followUser, getUserByID } from "../../redux/request/userRequest";

//TODO CREATE USER WAITTING LIST

const PersonalAvatarFriends = ({ userRoutePage, socket }) => {
    const [isFollow, setIsFollow] = useState(false);
    const [isApprover, setIsApprover] = useState(false);
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);
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

    const isUserGotFollowed = (sender, userRoute) => {
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

    const isUserSendFollow = (sender, userRoute) => {
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
                isUserGotFollowed(sender, userRoute);
            }

            if (sender === currentUser._id) {
                isUserSendFollow(sender, userRoute);
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
                className="add-stories w-100 text-white py-3 px-4 fs-5 me-2"
                onClick={handleClick}
            >
                <span className="d-block">{label}</span>
            </div>
        );
    };

    return (
        <div className="tools d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between">
                {renderRandomAvatarFriends()}
            </div>

            <div className="d-flex edit-profile">{renderFollowBtn()}</div>
        </div>
    );
};

export default PersonalAvatarFriends;
