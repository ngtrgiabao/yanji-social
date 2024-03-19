import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";

const FollowerCard = ({ userID, username, profilePicture, close }) => {
  return (
    <Link
      to={userID ? `/user/${userID}` : "/404"}
      className="p-2 d-flex align-items-center my-2"
      style={{
        border: "1px solid",
        borderRadius: "0.5rem",
        color: "unset",
      }}
      onClick={close}
    >
      <div className="profile-pic me-3 fs-5 text-white">
        <Avatar imageSrc={profilePicture} label={username} userId={userID} />
      </div>
      {username}
    </Link>
  );
};

export default FollowerCard;
