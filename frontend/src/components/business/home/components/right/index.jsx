import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import isEqual from "react-fast-compare";

import TermLinks from "../../../../features/term-link";
import { Avatar } from "../../../../../components";
import { useCurrentUser, useFollowingList } from "../../../../../hooks";

const followingListStyle = {
  maxHeight: "500px",
  overflowY: "auto",
};

const renderFollowingList = (user) => {
  return user.map((user) => (
    <li key={user?._id} className="hover-bg">
      <Link
        to={`/user/${user?._id}`}
        className="d-flex align-items-center fs-5 text-white w-full p-2 px-3 rounded-3 border border-1"
        key={user?._id}
      >
        <div className="profile-pic d-flex justify-content-center align-items-center me-3">
          <Avatar
            userId={user?._id}
            imageSrc={user?.profilePicture}
            label={user?.username}
          />
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
    <div>
      <h4 className="border-bottom pb-3 mb-3 px-0">Following</h4>

      {currentUser && (
        <div
          className="sidebar p-3 overflowXHidden mb-3"
          style={followingListStyle}
        >
          <ul className="p-2 mb-0 gap-3 d-flex flex-column">
            {renderFollowingList(user)}
          </ul>
        </div>
      )}

      <TermLinks />
    </div>
  );
};

export default memo(HomeRight, isEqual);
