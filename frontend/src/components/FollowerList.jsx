import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getUserByID } from "../redux/request/userRequest";
import FollowerCard from "./FollowerCard";

const FollowerList = ({ close, userInfo }) => {
    const [active, setActive] = useState("FOLLOWERS");
    const [followers, setFollower] = useState([]);
    const [followings, setFollowings] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo._id) {
            const fetchData = async () => {
                const userData = await getUserByID(userInfo._id, dispatch);
                const { followers, followings } = userData.user;

                const followersPromises = followers.map((userID) =>
                    getUserByID(userID, dispatch).then((data) => data.user)
                );

                const followingsPromises = followings.map((userID) =>
                    getUserByID(userID, dispatch).then((data) => data.user)
                );

                const fetchedFollowers = await Promise.all(followersPromises);
                const fetchedFollowings = await Promise.all(followingsPromises);

                setFollower(fetchedFollowers);
                setFollowings(fetchedFollowings);
            };

            fetchData();
        }
    }, [userInfo._id, dispatch]);

    return (
        <div
            className="card animate__animated animate__fadeInLeft w-25 h-50"
            onClick={(e) => {
                if (e.currentTarget.classList.contains("card")) {
                    e.stopPropagation();
                }
            }}
        >
            <div className="d-flex justify-content-end mb-2">
                <div
                    className="p-2 px-3 custom-btn text-danger"
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        close();
                        setActive("FOLLOWERS");
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>

            <div className="mb-4 d-grid w-100" data-list>
                <div className="row gap-2 w-100 d-flex m-0">
                    <div
                        className="col custom-btn p-3"
                        style={{
                            border: "1px solid var(--color-primary)",
                            background:
                                active === "FOLLOWERS" &&
                                "var(--color-primary)",
                            color: active === "FOLLOWERS" && "white",
                        }}
                        onClick={() => setActive("FOLLOWERS")}
                    >
                        Followers
                    </div>
                    <div
                        className="col custom-btn p-3"
                        style={{
                            border: "1px solid var(--color-primary)",
                            background:
                                active === "FOLLOWINGS" &&
                                "var(--color-primary)",
                            color: active === "FOLLOWINGS" && "white",
                        }}
                        onClick={() => setActive("FOLLOWINGS")}
                    >
                        Followings
                    </div>
                </div>
            </div>

            <div className="h-100 overflow-auto">
                {active === "FOLLOWERS" &&
                    followers.map((user) => (
                        <FollowerCard
                            key={user._id}
                            userID={user._id}
                            username={user.username}
                            profilePicture={user.profilePicture}
                        />
                    ))}

                {active === "FOLLOWINGS" &&
                    followings.map((user) => (
                        <FollowerCard
                            key={user._id}
                            userID={user._id}
                            username={user.username}
                            profilePicture={user.profilePicture}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FollowerList;