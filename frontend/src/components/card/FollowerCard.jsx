import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
        {profilePicture ? (
          <img
            src={profilePicture}
            loading="lazy"
            role="presentation"
            decoding="async"
            alt="Avatar user"
            className="w-100"
          />
        ) : (
          <>{username}</>
        )}
      </div>
      {username}
    </Link>
  );
};

export default FollowerCard;
