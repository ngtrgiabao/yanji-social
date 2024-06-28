import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import isEqual from "react-fast-compare";

import { getUserByID } from "../../../redux/request/userRequest";

const UserInfoPopup = ({ userID }) => {
  const userInfo = useState({
    username: "",
    profilePicture: "",
    followers: 0,
    followings: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    userID &&
      getUserByID(userID, dispatch).then((data) => {
        console.log(data);
      });
  }, [userID, dispatch]);

  return (
    <div
      className="position-absolute bg-danger w-50 h-100 animate__animated animate__fadeIn"
      style={{
        top: "100%",
        left: "0",
        zIndex: "2",
      }}
    ></div>
  );
};

export default memo(UserInfoPopup, isEqual);
