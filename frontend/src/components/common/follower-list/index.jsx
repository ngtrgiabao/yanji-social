import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import isEqual from "react-fast-compare";

import { getUserByID } from "../../../redux/request/userRequest";
import { FollowerCard } from "../../ui";

const FollowerList = ({ close, userInfo }) => {
  const [active, setActive] = useState("FOLLOWERS");
  const [followers, setFollower] = useState([]);
  const [followings, setFollowings] = useState([]);

  const dispatch = useDispatch();

  const fetchFollowers = async (followers) => {
    const followersPromises = followers.map((userID) =>
      getUserByID(userID, dispatch).then((data) => data?.user),
    );
    const fetchedFollowers = await Promise.all(followersPromises);
    setFollower(fetchedFollowers);
  };

  const fetchFollowings = async (followings) => {
    const followingsPromises = followings.map((userID) =>
      getUserByID(userID, dispatch).then((data) => data?.user),
    );
    const fetchedFollowings = await Promise.all(followingsPromises);
    setFollowings(fetchedFollowings);
  };

  useEffect(() => {
    if (userInfo._id) {
      const fetchData = async () => {
        const userData = await getUserByID(userInfo._id, dispatch);
        const { followers, followings } = userData.user;

        fetchFollowers(followers);
        fetchFollowings(followings);
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
          role="button"
          className="p-2 px-3 text-danger"
          onClick={() => {
            close();
            setActive("FOLLOWERS");
          }}
        >
          <X size={20} />
        </div>
      </div>

      <div className="mb-4 d-grid w-100" data-list>
        <div className="row gap-2 w-100 d-flex m-0">
          <div
            role="button"
            className="col p-3"
            style={{
              border: "1px solid var(--color-primary)",
              background: active === "FOLLOWERS" && "var(--color-primary)",
              color: active === "FOLLOWERS" && "white",
            }}
            onClick={() => setActive("FOLLOWERS")}
          >
            Followers
          </div>
          <div
            role="button"
            className="col p-3"
            style={{
              border: "1px solid var(--color-primary)",
              background: active === "FOLLOWINGS" && "var(--color-primary)",
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
              key={user?._id}
              userID={user?._id}
              username={user?.username}
              profilePicture={user?.profilePicture}
              close={close}
            />
          ))}

        {active === "FOLLOWINGS" &&
          followings.map((user) => (
            <FollowerCard
              key={user?._id}
              userID={user?._id}
              username={user?.username}
              profilePicture={user?.profilePicture}
              close={close}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(FollowerList, isEqual);
