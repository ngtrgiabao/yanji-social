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

import "./style/homeLeft.css";

import { LOGO_YANJI_SOCIAL } from "../../assets";

import { getUserByID } from "../../redux/request/userRequest";

// SETTINGS
import { CustomTheme, PostPopup, Setting } from "../../components";

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

  const renderHomeBtn = () => {
    return (
      <Link
        to="/"
        className={`menu-item ${active === "HOME" ? "active" : ""}`}
        onClick={() => setActive("HOME")}
        title="Truy cập trang chủ"
      >
        <span>
          <UilEstate className="sidebar-icon" />
        </span>
        <h3 className="ms-3">Home</h3>
      </Link>
    );
  };

  const renderMeetingBtn = () => {
    return (
      <a
        href="https://meet-with-us.netlify.app/"
        className={`menu-item ${active === "MEETING" ? "active" : ""}`}
        onClick={() => {
          setActive("MEETING");
        }}
        title="Meeting"
      >
        <span>
          <FontAwesomeIcon
            icon={faVideo}
            style={{
              marginLeft: "2rem",
              color: "#9e98b3",
            }}
            className="fs-2 sidebar-icon"
          />
        </span>
        <h3 className="ms-4">Meeting</h3>
      </a>
    );
  };

  const renderNotificationBtn = () => {
    return (
      <Link
        to="/notification"
        className={`menu-item ${active === "NOTIFICATION" ? "active" : ""}`}
        onClick={() => {
          setActive("NOTIFICATION");
        }}
        id="notification"
        title="Thông báo"
      >
        <span>
          <UilBell className="sidebar-icon" />
          {isReadNotification && (
            <small
              className="notification-count bg-danger"
              style={{
                display: `${active === "NOTIFICATION" ? "none" : ""}`,
              }}
            ></small>
          )}
        </span>
        <h3 className="ms-3">Notification</h3>
      </Link>
    );
  };

  const renderMessageBtn = () => {
    return (
      <Link
        to="/messages"
        className={`menu-item ${active === "MESSAGES" ? "active" : ""}`}
        onClick={() => {
          setActive("MESSAGES");
        }}
        id="message-notification"
        title="Tin nhắn"
      >
        <span>
          <UilChat className="sidebar-icon" />
          {/* <small
                            className="notification-count bg-danger"
                            style={{
                                display: `${
                                    active === "MESSAGES" ? "none" : ""
                                }`,
                            }}
                        ></small> */}
        </span>
        <h3 className="ms-3">Messages</h3>
      </Link>
    );
  };

  const renderBookmarkBtn = () => {
    return (
      <Link
        to="/bookmarks"
        className={`menu-item ${active === "BOOKMARKS" ? "active" : ""}`}
        onClick={() => {
          setActive("BOOKMARKS");
        }}
        title="Bài viết đã lưu"
      >
        <span>
          <UilBookmark className="sidebar-icon" />
        </span>
        <h3 className="ms-3">Bookmarks</h3>
      </Link>
    );
  };

  const renderThemeBtn = () => {
    return (
      <div
        className={`menu-item ${active === "THEME" ? "active" : ""}`}
        id="theme"
        onClick={() => {
          setActive("THEME");
        }}
        title="Đổi giao diện"
      >
        <span>
          <UilPalette className="sidebar-icon" />
        </span>
        <h3 className="ms-4">Theme</h3>
      </div>
    );
  };

  const renderSettingBtn = () => {
    return (
      <div
        className={`menu-item ${active === "SETTINGS" ? "active" : ""}`}
        onClick={() => {
          setActive("SETTINGS");
        }}
        title="Cài đặt"
      >
        <span>
          <UilSetting className="sidebar-icon" />
        </span>
        <h3 className="ms-4">Settings</h3>
      </div>
    );
  };

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

  const handleClostPopup = () => {
    setActive("");
  };

  const renderSettingPopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== "SETTINGS"}
        onClick={() => setActive("")}
      >
        <Setting close={handleClostPopup} />
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
            <img
              loading="lazy"
              role="presentation"
              decoding="async"
              src={
                currentUser
                  ? user.profilePicture || LOGO_YANJI_SOCIAL
                  : LOGO_YANJI_SOCIAL
              }
              alt="Avatar user"
              className="w-100"
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

        <div className="sidebar mt-3">
          {renderHomeBtn()}
          {currentUser && renderNotificationBtn()}
          {currentUser && renderMessageBtn()}
          {currentUser && renderBookmarkBtn()}
          {renderMeetingBtn()}
          {renderThemeBtn()}
          {currentUser && renderSettingBtn()}
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
