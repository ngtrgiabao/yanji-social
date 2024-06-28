import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isEqual from "react-fast-compare";

import { ToastProvider } from "../../../context/toast";

import "./styles/personal.css";

import { getUserByID, updateUser } from "../../../redux/request/userRequest";

import {
  PersonalBody,
  PersonalGeneralInfo,
  PersonalHeader,
  PersonalNavbarProfile,
} from "./components";
import _404Page from "../_404";
import { PhotosUser } from "../../../components";
import SocialMediaInput from "../../../components/ui/input/social-media";

import Global from "../../../constant/global";
import { useCurrentUser } from "../../../hooks";
import { RouteNames } from "../../../constant/routes";
import Header from "../../../components/layouts/header";
import ConfirmDialog from "../../ui/dialog/confirm-dialog";

const userInfoDefaultValues = {
  _id: "",
  username: "",
  profilePicture: "",
  coverPicture: "",
  followers: [],
  followings: [],
  bio: "",
  insta: "",
  linkedin: "",
  github: "",
  pinterest: "",
  youtube: "",
  twitter: "",
  twitch: "",
  postShared: [],
  blackList: [],
  postSaved: [],
  isVerify: false,
};

const Personal = ({ socket }) => {
  const { userID: userRoute } = useParams();
  const { photos: photosRoute } = useParams();

  const [userInfo, setUserInfo] = useState(userInfoDefaultValues);
  const [isValid, setIsValid] = useState(true);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    getUserByID(userRoute, dispatch)
      .then((data) => {
        setIsValid(true);
        setUserInfo(data.user);
      })
      .catch((err) => {
        setIsValid(false);
        console.error("User is not valid", err);
      });
  }, [userRoute, dispatch]);

  const onUpdateBioPopup = () => {
    setActive("UPDATE_BIO");
  };

  const onUpdateIntroducePopup = () => {
    setActive("UPDATE_INTRODUCE");
  };

  const handleUpdateBio = () => {
    getUserByID(currentUser._id, dispatch).then((data) => {
      const {
        bio,
        insta,
        linkedin,
        github,
        pinterest,
        youtube,
        twitter,
        twitch,
      } = data.user;
      setIsLoading(true);

      if (bio !== userInfo.bio) {
        let updatedUser = {
          userID: currentUser._id,
          bio: userInfo.bio,
          insta,
          linkedin,
          github,
          pinterest,
          youtube,
          twitter,
          twitch,
        };

        if (userInfo.bio.length === 0) {
          updatedUser = {
            userID: currentUser._id,
            bio: "",
            insta,
            linkedin,
            github,
            pinterest,
            youtube,
            twitter,
            twitch,
          };
        }

        updateUser(updatedUser, dispatch)
          .then((data) => {
            socket = io(Global.SOCKET_URL);
            socket.emit("update-user", updatedUser);
          })
          .catch((err) => {
            console.error("Failed to update user", err);
          });
      }

      setTimeout(() => {
        setIsLoading(false);
        setActive("");
      }, 1500);
    });
  };

  const handleUpdateIntroduce = () => {
    getUserByID(currentUser._id, dispatch).then((data) => {
      const {
        insta,
        linkedin,
        github,
        pinterest,
        youtube,
        twitter,
        twitch,
        bio,
      } = data.user;
      setIsLoading(true);

      if (
        insta !== userInfo.insta ||
        linkedin !== userInfo.linkedin ||
        github !== userInfo.github ||
        pinterest !== userInfo.pinterest ||
        youtube !== userInfo.youtube ||
        twitter !== userInfo.twitter ||
        twitch !== userInfo.twitch
      ) {
        let updatedUser = {
          userID: currentUser._id,
          insta: userInfo.insta,
          linkedin: userInfo.linkedin,
          github: userInfo.github,
          pinterest: userInfo.pinterest,
          youtube: userInfo.youtube,
          twitter: userInfo.twitter,
          twitch: userInfo.twitch,
          bio,
        };

        if (userInfo.insta.length === 0) {
          updatedUser = {
            userID: currentUser._id,
            insta: "",
            linkedin: userInfo.linkedin,
            github: userInfo.github,
            pinterest: userInfo.pinterest,
            youtube: userInfo.youtube,
            twitter: userInfo.twitter,
            twitch: userInfo.twitch,
            bio: userInfo.bio,
          };
        }

        updateUser(updatedUser, dispatch)
          .then(() => {
            socket = io(Global.SOCKET_URL);
            socket.emit("update-user", updatedUser);
          })
          .catch((err) => {
            console.error("Failed to update user", err);
          });
      }

      setTimeout(() => {
        setIsLoading(false);
        setActive("");
      }, 1500);
    });
  };

  const renderUpdateBioPopup = () => {
    return (
      active === "UPDATE_BIO" && (
        <ConfirmDialog
          title="UPDATE BIO"
          confirmButtonText="Confirm"
          children={
            <textarea
              value={userInfo.bio}
              style={{
                resize: "none",
                width: "30rem",
                height: "10rem",
              }}
              onChange={(e) =>
                setUserInfo((prevUser) => ({
                  ...prevUser,
                  bio: e.target.value,
                }))
              }
              className="text-white border-white bg-transparent p-2"
              spellCheck="false"
              maxLength={50}
            />
          }
          onConfirm={() => handleUpdateBio()}
          onClose={() => setActive("")}
          isLoading={isLoading}
        />
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const renderContentUpdateIntroduce = () => {
    const socialMediaFields = [
      { icon: faLinkedin, label: "linkedin" },
      { icon: faGithub, label: "github" },
      { icon: faInstagram, label: "insta" },
      { icon: faPinterest, label: "pinterest" },
      { icon: faYoutube, label: "youtube" },
      { icon: faTwitter, label: "twitter" },
      { icon: faTwitch, label: "twitch" },
    ];

    return (
      <div
        className="text-white overflow-auto pe-3"
        style={{
          width: "40rem",
          maxHeight: "40rem",
        }}
      >
        {socialMediaFields.map(({ icon, label }) => (
          <SocialMediaInput
            key={label}
            icon={<FontAwesomeIcon icon={icon} className="me-2" />}
            label={label}
            value={userInfo[label]}
            onChange={handleInputChange}
          />
        ))}
      </div>
    );
  };

  const renderUpdateIntroducePopup = () => {
    return (
      active === "UPDATE_INTRODUCE" && (
        <ConfirmDialog
          title="UPDATE INTRODUCE"
          confirmButtonText="Confirm"
          children={renderContentUpdateIntroduce()}
          onConfirm={() => handleUpdateIntroduce()}
          onClose={() => setActive("")}
          isLoading={isLoading}
        />
      )
    );
  };

  return isValid ? (
    <div className="position-relative">
      <Header title="Login" link={RouteNames.REGISTER} />
      <div className="personal-container">
        <PersonalHeader userInfo={userInfo} socket={socket} />
        <PersonalGeneralInfo userInfo={userInfo} socket={socket} />

        <hr className="my-5" />

        <PersonalNavbarProfile />

        {photosRoute ? (
          <PhotosUser userInfo={userInfo} />
        ) : (
          <PersonalBody
            socket={socket}
            userInfo={userInfo}
            onUpdateBioPopup={onUpdateBioPopup}
            onUpdateIntroducePopup={onUpdateIntroducePopup}
          />
        )}
      </div>

      {renderUpdateBioPopup()}
      {renderUpdateIntroducePopup()}
      <ToastProvider />
    </div>
  ) : (
    <_404Page />
  );
};

export default memo(Personal, isEqual);
