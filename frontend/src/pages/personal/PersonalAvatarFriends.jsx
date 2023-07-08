import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

import { getUserByID, updateUser } from "../../redux/request/userRequest";

//TODO CREATE USER WAITTING LIST

const PersonalAvatarFriends = ({ userRoutePage, socket }) => {
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);
    const [isApprover, setIsApprover] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleFollow = () => {
        socket = io(SOCKET_URL);

        socket.emit("follow", {
            // add author of current account to update friendRequests list
            sender: currentUser._id,
            // add user route page to checking is this user send request?
            userRoute: userRoutePage._id,
            isFollowing: true,
        });

        // Add userRoutePage to following list of user who sent follow
        getUserByID(currentUser._id, dispatch).then((data) => {
            const { followings } = data.user;

            const newUpdateUser = {
                userID: currentUser._id,
            };

            newUpdateUser.followings = [userRoutePage._id, ...followings];

            updateUser(newUpdateUser, dispatch)
                .then(() => {
                    console.log("Followed user", userRoutePage._id);
                    if (isApprover) {
                        setIsApprover(false);
                        setIsFollow(true);
                    }
                })
                .catch((err) => {
                    console.error("Failed to follow", err);
                });
        });
    };

    const handleSocket = {
        follow: useCallback(
            (data) => {
                const { userRoute, isFollowing, sender } = data;
                userRoute === userRoutePage._id &&
                    getUserByID(userRoute, dispatch).then((data) => {
                        const { followers } = data?.user;
                        const newUpdateUser = {
                            userID: userRoute,
                        };

                        // add user who sent follow to follower list
                        newUpdateUser.followers = [
                            currentUser._id,
                            ...followers,
                        ];

                        updateUser(newUpdateUser, dispatch)
                            .then(() => {
                                console.log("Sent follow successfully");
                            })
                            .catch((err) => {
                                console.error("Failed to send follow", err);
                            });
                    });

                userRoute === currentUser._id && setIsApprover(true);

                getUserByID(userRoute, dispatch).then((data) => {
                    const { followings } = data?.user;

                    const checkIsFollowedBack = followings.some(
                        (u) => u === userRoutePage._id
                    );

                    if (followings.length > 0) {
                        checkIsFollowedBack &&
                            setIsApprover(false) &&
                            setIsFollow(isFollowing);
                    }
                });

                getUserByID(currentUser._id, dispatch).then((data) => {
                    const { followers } = data.user;

                    const isFollowing = followers.includes(userRoutePage._id);

                    isFollowing && setIsApprover(false) && setIsFollow(true);
                });

                isFollowing && sender === currentUser._id && setIsFollow(true);
            },
            [currentUser._id, dispatch, userRoutePage._id]
        ),
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

                if (followers.length > 0) {
                    const checkIsApprover = followers.some(
                        (u) => u === userRoutePage._id
                    );
                    const checkIsFollowedBack = followings.some(
                        (u) => u === userRoutePage._id
                    );

                    checkIsApprover &&
                        !checkIsFollowedBack &&
                        setIsApprover(true);
                }

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
            handleClick = null;
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
