import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UilEstate,
  UilBell,
  UilChat,
  UilBookmark,
  UilPalette,
  UilSetting,
} from "@iconscout/react-unicons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import "../styles/homeLeft.css";

import { getUserByID } from "../../../redux/request/userRequest";

import { LOGO_YANJI_SOCIAL } from "../../../assets";

// SETTINGS
import { Avatar, CustomTheme, PostPopup, Setting } from "../../../components";
import { Button } from "../../../components";

const HomeLeft = ({ socket, isReadNotification }) => {
  const [active, setActive] = useState("HOME");
  const [avatar, setAvatar] = useState("");
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    profilePicture: "",
    username: "",
    isVerify: false,
  });
  const dispatch = useDispatch();

  // CLEANUP URL WHEN CHANGE IMG
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  // SAVE IMG TO LOCAL
  useEffect(() => {
    avatar && window.localStorage.setItem("avatar", avatar);
  }, [avatar]);

  // GET IMG FROM LOCAL
  useEffect(() => {
    const data = window.localStorage.getItem("avatar");
    setAvatar(data);
  }, [avatar]);

  /*
    1. It’s using the useSelector hook to get the currentUser from the Redux store.
    2. It’s using the optional chaining operator to check if the currentUser is not null.
    3. It’s returning the currentUser.
    */
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser._id, dispatch).then((data) => {
        const { _id, profilePicture, username, isVerify } = data.user;
        setUser({
          _id: _id,
          profilePicture: profilePicture,
          username: username,
          isVerify: isVerify,
        });
      });
  }, [currentUser, dispatch]);

  const renderCustomThemePopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== "THEME"}
        onClick={() => setActive("")}
      >
        <CustomTheme />
      </div>
    );
  };

  const handleClosePopup = () => {
    setActive("");
  };
  const renderSettingPopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== "SETTINGS"}
        onClick={() => setActive("")}
      >
        <Setting close={handleClosePopup} />
      </div>
    );
  };

  const handlePopup = () => {
    setPopup((popup) => !popup);
  };

  const renderPostPopup = () => {
    return (
      currentUser?._id &&
      popup && (
        <PostPopup
          socket={socket}
          onPopup={handlePopup}
          extendClass="animate__animated animate__fadeIn"
        />
      )
    );
  };

  return (
    <>
      <div className="left animate__animated animate__bounceInLeft">
        <Link
          to={currentUser ? `/user/${user._id}` : "/"}
          className="profile d-flex align-items-center"
          title="Truy cập trang cá nhân"
        >
          <div className="profile-pic">
            {/*<img*/}
            {/*  loading="lazy"*/}
            {/*  role="presentation"*/}
            {/*  decoding="async"*/}
            {/*  src={*/}
            {/*    currentUser*/}
            {/*      ? user.profilePicture || LOGO_YANJI_SOCIAL*/}
            {/*      : LOGO_YANJI_SOCIAL*/}
            {/*  }*/}
            {/*  alt="Avatar user"*/}
            {/*  className="w-100"*/}
            {/*/>*/}
            <Avatar
              imageSrc={currentUser ? user.profilePicture : LOGO_YANJI_SOCIAL}
              label={user.username}
            />
          </div>

          <div className="handle">
            <h4>
              {currentUser ? `${user.username}` : `user`}
              {user.isVerify && (
                <FontAwesomeIcon
                  className="ms-2 bg-white rounded rounded-circle text-primary"
                  icon={faCircleCheck}
                  style={{
                    fontSize: "1.3rem",
                  }}
                />
              )}
            </h4>
            <p className="text-muted m-0">
              @{currentUser ? user.username : "user"}
            </p>
          </div>
        </Link>

        {/* SIDEBAR */}
        <div className="sidebar mt-3">
          <Button
            path="/"
            label="Home"
            icon={<UilEstate className="sidebar-icon" />}
            name={"HOME"}
            active={active}
            setActive={setActive}
          />

          {currentUser && (
            <>
              <Button
                path="/notification"
                label="Notification"
                icon={<UilBell className="sidebar-icon" />}
                name={"NOTIFICATION"}
                isReadNotification={isReadNotification}
                active={active}
                setActive={setActive}
              />
              <Button
                path="/messages"
                label="Messages"
                icon={<UilChat className="sidebar-icon" />}
                name={"MESSAGES"}
                active={active}
                setActive={setActive}
              />
              <Button
                path="/bookmarks"
                label="Bookmarks"
                icon={<UilBookmark className="sidebar-icon" />}
                name={"BOOKMARKS"}
                active={active}
                setActive={setActive}
              />
            </>
          )}
          <Button
            label="Meeting"
            path="https://meet-with-us.netlify.app/"
            icon={
              <FontAwesomeIcon
                icon={faVideo}
                style={{
                  marginLeft: "2rem",
                  color: "#9e98b3",
                }}
                className="fs-2 sidebar-icon"
              />
            }
            name={"MEETING"}
            active={active}
            setActive={setActive}
          />
          <Button
            label="Theme"
            icon={<UilPalette className="sidebar-icon" />}
            name={"THEME"}
            active={active}
            setActive={setActive}
          />
          {currentUser && (
            <Button
              label="Settings"
              icon={<UilSetting className="sidebar-icon" />}
              name={"SETTINGS"}
              active={active}
              setActive={setActive}
            />
          )}
        </div>
        {/* END OF SIDEBAR */}

        <label
          htmlFor="create-post"
          className="btn btn-primary mt-3 py-3"
          onClick={handlePopup}
        >
          Create Post
        </label>
      </div>

      {renderCustomThemePopup()}
      {renderPostPopup()}
      {renderSettingPopup()}
    </>
  );
};

export default HomeLeft;
