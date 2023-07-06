import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { getUserByID, updateUser } from "../../redux/request/userRequest";

//TODO CREATE USER WAITTING LIST

const PersonalAvatarFriends = ({ user, socket }) => {
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);
    const userRoutePage = useParams().userID;
    const [isApprover, setIsApprover] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleAddFriend = () => {
        socket = io(SOCKET_URL);

        socket.emit("follow", {
            // add author of current account to update friendRequests list
            userID: currentUser._id,
            // add user route page to checking is this user send request?
            userRoute: userRoutePage,
            isFollowing: true,
        });

        getUserByID(currentUser._id, dispatch).then((data) => {
            const { followings } = data.user;

            const newUpdateUser = {
                userID: currentUser._id,
            };

            newUpdateUser.followings = [userRoutePage, ...followings];

            updateUser(newUpdateUser, dispatch)
                .then((data) => {
                    console.log("Followed user", userRoutePage, data);
                })
                .catch((err) => {
                    console.error("Failed to follow", err);
                });
        });
    };

    const handleSocket = {
        addFriend: useCallback(
            (data) => {
                const { userRoute, isFollowing } = data;

                userRoute === userRoutePage &&
                    // userRoutePage now is friend route
                    getUserByID(userRoutePage, dispatch).then((data) => {
                        const { followers } = data.user;
                        const newUpdateUser = {
                            userID: userRoutePage,
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

                if (userRoute === currentUser._id) {
                    setIsApprover(true);
                }

                isFollowing && setIsFollow(true);
            },
            [currentUser._id, dispatch, userRoutePage]
        ),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("followed", handleSocket.addFriend);

        return () => {
            socket.off("followed", handleSocket.addFriend);
        };
    }, [SOCKET_URL, handleSocket.addFriend]);

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
                        (u) => u === userRoutePage
                    );

                    checkIsApprover && setIsApprover(true);
                }

                getUserByID(userRoutePage, dispatch).then((data) => {
                    const { followers } = data.user;

                    const isRequestFriend = followers.includes(currentUser._id);
                    const isFollowing = followings.includes(userRoutePage);

                    setIsFollow(isFollowing);
                    console.log(isFollowing, isRequestFriend);
                });
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUser._id, dispatch, userRoutePage]);

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
            label = "Follow back";
            handleClick = null;
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
            handleClick = handleAddFriend;
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

            <div className="d-flex edit-profile">{renderAddFriendBtn()}</div>
        </div>
    );
};

export default PersonalAvatarFriends;
