import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Home,
  Bell,
  MessageSquare,
  Bookmark,
  Video,
  Palette,
  Bolt,
  CheckCircle2,
} from "lucide-react";

import "../styles/homeLeft.css";

import { getUserByID } from "../../../redux/request/userRequest";

import { LOGO_YANJI_SOCIAL } from "../../../assets";

// SETTINGS
import { Avatar, CustomTheme, Setting, PostPopup } from "../../../components";
import { Button } from "../../../components/common";
import { useCurrentUser } from "../../../hooks";

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
  const currentUser = useCurrentUser();

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
            <Avatar
              imageSrc={currentUser ? user.profilePicture : LOGO_YANJI_SOCIAL}
              label={user.username}
            />
          </div>

          <div className="handle">
            <h4 className="d-flex align-items-center">
              {currentUser ? `${user.username}` : `user`}
              {user.isVerify && (
                <CheckCircle2 size={15} className="ms-2 text-primary" />
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
            icon={<Home className="sidebar-icon" size={20} />}
            name={"HOME"}
            active={active}
            setActive={setActive}
          />

          {currentUser && (
            <>
              <Button
                path="/notification"
                label="Notification"
                icon={<Bell className="sidebar-icon" size={20} />}
                name={"NOTIFICATION"}
                isReadNotification={isReadNotification}
                active={active}
                setActive={setActive}
              />
              <Button
                path="/messages"
                label="Messages"
                icon={<MessageSquare className="sidebar-icon" size={20} />}
                name={"MESSAGES"}
                active={active}
                setActive={setActive}
              />
              <Button
                path="/bookmarks"
                label="Bookmarks"
                icon={<Bookmark className="sidebar-icon" size={20} />}
                name={"BOOKMARKS"}
                active={active}
                setActive={setActive}
              />
            </>
          )}
          <Button
            label="Meeting"
            path="https://meet-with-us.netlify.app/"
            icon={<Video className="sidebar-icon" size={20} />}
            name={"MEETING"}
            active={active}
            setActive={setActive}
          />
          <Button
            label="Theme"
            icon={<Palette className="sidebar-icon" size={20} />}
            name={"THEME"}
            active={active}
            setActive={setActive}
          />
          {currentUser && (
            <Button
              label="Settings"
              icon={<Bolt className="sidebar-icon" size={20} />}
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
