import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Camera } from "lucide-react";
import isEqual from "react-fast-compare";

import PersonalFollow from "./follow";

import "../styles/personalGeneralInfo.css";

import { Avatar } from "../../../../components";
import ChangeImagePopup from "../../../ui/popup/change-image";
import { getUserByID } from "../../../../redux/request/userRequest";
import { useCurrentUser } from "../../../../hooks";
import Global from "../../../../constant/global";
import FollowerList from "../../../ui/follower-list";

const PersonalGeneralInfo = ({ userInfo, socket }) => {
  const [active, setActive] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const snackBar = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const handlePopup = () => {
    setOpenPopup((openPopup) => !openPopup);
  };

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
            <div
              className={`avatar d-flex justify-content-center align-items-center text-white ${userInfo?._id === Global.ADMIN_ID && ""}`}
            >
              <Avatar
                imageSrc={userInfo?.profilePicture}
                label={userInfo?.username}
                userId={userInfo?._id}
                fontSize={"fs-1"}
                customClass="fw-bold"
              />
            </div>
            {userInfo?._id === currentUser?._id && (
              <span className="position-absolute border border-primary rounded-circle p-3 edit-avatar">
                <Camera size={20} />
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

export default memo(PersonalGeneralInfo, isEqual);
