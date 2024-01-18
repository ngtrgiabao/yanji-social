import { useEffect, useRef, useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PersonalFollow from "./PersonalFollow";

import "../styles/personalGeneralInfo.css";
import "../../../styles/animations/snackbar.css";

import { ChangeImagePopup, FollowerList } from "../../../components";
import { getUserByID } from "../../../redux/request/userRequest";

const PersonalGeneralInfo = ({ userInfo, socket }) => {
  const [active, setActive] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const snackBar = useRef(null);
  const dispatch = useDispatch();

  const handlePopup = () => {
    setOpenPopup((openPopup) => !openPopup);
  };

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });

  useEffect(() => {
    userInfo._id &&
      getUserByID(userInfo._id, dispatch).then((data) => {
        const { followers, followings } = data.user;

        setFollowers(followers.length);
        setFollowings(followings.length);
      });
  }, [userInfo._id, dispatch]);

  const handleUpdatePopup = () => {
    if (snackBar.current) {
      const sb = snackBar.current;
      sb.className = "show";

      setTimeout(() => {
        sb.className = sb.className.replace("show", "");
        window.location.reload();
      }, 3000);
    }
  };

  const handleClosePopup = () => {
    setActive("");
  };

  const renderFollowerListPopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== "FOLLOWER_LIST"}
        onClick={() => setActive("")}
      >
        <FollowerList userInfo={userInfo} close={handleClosePopup} />
      </div>
    );
  };

  return (
    <>
      <div className="px-5 header-title">
        <div className="d-flex align-items-center justify-content-between header-title-container w-100 h-100">
          <div
            className="position-relative"
            onClick={() => userInfo?._id === currentUser?._id && handlePopup()}
          >
            <div className="avatar d-flex justify-content-center align-items-center text-white">
              {userInfo.profilePicture ? (
                <img
                  loading="lazy"
                  role="presentation"
                  decoding="async"
                  src={userInfo.profilePicture}
                  alt="Avatar user"
                  className="w-100"
                />
              ) : (
                <div className="fs-2">{userInfo.username}</div>
              )}
            </div>
            {userInfo?._id === currentUser?._id && (
              <span className="position-absolute border border-primary rounded-circle p-2 edit-avatar">
                <UilCamera />
              </span>
            )}
          </div>

          <div
            data-title="information"
            className="w-100 ms-4 mt-5 d-flex justify-content-between"
          >
            <span>
              <div className="d-flex align-items-center">
                <span className="name">
                  {userInfo?.username || "loading..."}
                </span>
                {userInfo?.isVerify && (
                  <FontAwesomeIcon
                    className="ms-2 fs-3 bg-white rounded rounded-circle text-primary"
                    icon={faCircleCheck}
                  />
                )}
              </div>
              <div className="d-flex">
                <div
                  className="friends mb-4 me-3 link-underline"
                  onClick={() => setActive("FOLLOWER_LIST")}
                >
                  {followers} Followers
                </div>
                <div
                  className="friends mb-4 link-underline"
                  onClick={() => setActive("FOLLOWER_LIST")}
                >
                  {followings} Followings
                </div>
              </div>
            </span>

            <div className="profile-title d-flex align-items-center">
              <PersonalFollow userInfo={userInfo} socket={socket} />
            </div>
          </div>
        </div>

        {openPopup && (
          <ChangeImagePopup
            title="Cập nhật ảnh đại diện"
            imgSrc={userInfo.profilePicture}
            isAvatar={true}
            onClose={() => setOpenPopup("")}
            message="Update avatar successfully"
            socket={socket}
            handleUpdatePopup={handleUpdatePopup}
          />
        )}

        <div
          ref={snackBar}
          id="snackbar"
          style={{
            backgroundColor: "var(--color-success)",
          }}
          className="fw-bold"
        >
          Update avatar successfully
        </div>
      </div>

      {renderFollowerListPopup()}
    </>
  );
};

export default PersonalGeneralInfo;
