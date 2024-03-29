import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Avatar, TermLinks } from "../../../components";
import { useCurrentUser, useFollowingList } from "../../../hooks";
import "../styles/homeRight.css";

const followingListStyle = {
  maxHeight: "500px",
  overflowY: "auto",
};

const renderFollowingList = (user) => {
  return user.map((user) => (
    <li key={user?._id} className="hover-bg">
      <Link
        to={`/user/${user?._id}`}
        className="d-flex align-items-center fs-5 text-white my-2 w-full p-2 px-3 rounded-3 border border-1"
        key={user?._id}
      >
        <div className="profile-pic d-flex justify-content-center align-items-center me-3">
          <Avatar imageSrc={user?.profilePicture} label={user?.username} />
        </div>
        <span
          style={{
            color: "var(--color-primary)",
          }}
        >
          {user?.username}
        </span>
      </Link>
    </li>
  ));
};

const HomeRight = () => {
  const [user, setUser] = useState([]);
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const { fetchFollowingList } = useFollowingList({
    currentUserID: currentUser?._id,
    dispatch,
    setFollowings: setUser,
  });

  useEffect(() => {
    fetchFollowingList();
  }, [fetchFollowingList]);

  return (
    <div className="row right">
      <div className="col">
        {currentUser && (
          <>
            <h4>Following</h4>
            <hr className="m-0 my-4" />
            <div
              className="following-list overflowXHidden"
              style={followingListStyle}
            >
              <ul className="p-3 row">{renderFollowingList(user)}</ul>
            </div>
          </>
        )}
        <TermLinks />
      </div>
    </div>
  );
};

export default memo(HomeRight);
