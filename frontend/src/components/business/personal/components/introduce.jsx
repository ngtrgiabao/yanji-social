import { memo, useCallback, useEffect, useState } from "react";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import isEqual from "react-fast-compare";

import "../styles/personalIntroduce.css";

import { PersonalGallery } from "../components";
import { getUserByID } from "../../../../redux/request/userRequest";
import { SocialBio } from "../../../../components";
import SocketEvent from "../../../../constant/socket-event";
import Global from "../../../../constant/global";
import { useCurrentUser } from "../../../../hooks";

const PersonalIntroduce = ({
  onUpdateBioPopup,
  socket,
  onUpdateIntroducePopup,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [socialBio, setSocialBio] = useState({
    bio: userInfo.bio,
    insta: userInfo.insta,
    linkedin: userInfo.linkedin,
    github: userInfo.github,
    pinterest: userInfo.pinterest,
    youtube: userInfo.youtube,
    twitter: userInfo.twitter,
    twitch: userInfo.twitch,
  });
  const currentUser = useCurrentUser();

  const handleSocket = {
    updateUser: useCallback((data) => {
      setSocialBio((prevUser) => ({
        ...prevUser,
        ...data,
      }));
    }, []),
  };

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.UPDATED_USER, handleSocket.updateUser);

    return () => {
      socket.off(SocketEvent.UPDATED_USER, handleSocket.updateUser);
    };
  }, [handleSocket.updateUser]);

  const introduceInfo = [
    {
      id: 1,
      username: socialBio?.insta,
      icon: faInstagram,
      href: "https://www.instagram.com/" + socialBio?.insta,
    },
    {
      id: 2,
      username: socialBio?.linkedin,
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/" + socialBio?.linkedin,
    },
    {
      id: 3,
      username: socialBio?.github,
      icon: faGithub,
      href: "https://github.com/" + socialBio?.github,
    },
    {
      id: 4,
      username: socialBio?.pinterest,
      icon: faPinterest,
      href: "https://www.pinterest.com/" + socialBio?.pinterest,
    },
    {
      id: 5,
      username: socialBio?.youtube,
      icon: faYoutube,
      href: "https://www.youtube.com/channel/@" + socialBio?.youtube,
    },
    {
      id: 6,
      username: socialBio?.twitter,
      icon: faTwitter,
      href: "https://twitter.com/" + socialBio?.twitter,
    },
    {
      id: 7,
      username: socialBio?.twitch,
      icon: faTwitch,
      href: "https://www.twitch.tv/" + socialBio?.twitch,
    },
  ];

  useEffect(() => {
    userInfo?._id &&
      getUserByID(userInfo?._id, dispatch).then((data) => {
        setSocialBio({
          ...data?.user,
        });
      });
  }, [userInfo?._id, dispatch]);

  const renderIntroduceInfo = () => {
    return introduceInfo.map(
      (item) =>
        item.username && (
          <SocialBio
            key={item.id}
            icon={item.icon}
            link={item.href}
            username={item.username}
          />
        ),
    );
  };

  return (
    <>
      <p className="fs-1 fw-bold">Introduce</p>

      <div className="w-100">
        <div className="d-flex flex-column align-items-center fs-4">
          <p className="inline-block text-break">{socialBio?.bio}</p>
        </div>
        {currentUser?._id === userInfo?._id && (
          <button className="mb-4" onClick={() => onUpdateBioPopup()}>
            Edit bio
          </button>
        )}
      </div>

      <div className="border-bottom pb-2 mb-4">{renderIntroduceInfo()}</div>

      {currentUser?._id === userInfo?._id && (
        <button className="my-4" onClick={() => onUpdateIntroducePopup()}>
          Edit Details
        </button>
      )}

      <PersonalGallery />
    </>
  );
};

export default memo(PersonalIntroduce, isEqual);
