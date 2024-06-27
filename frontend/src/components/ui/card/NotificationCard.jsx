import { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Mail,
  Repeat,
  MessageSquare,
  Users,
  Megaphone,
} from "lucide-react";

import "./style/notificationCard.css";

import { NotiType } from "../../../constant/notification";
import { getUserByID } from "../../../redux/request/userRequest";
import { useTimeAgo } from "../../../hooks";
import Avatar from "../avatar/Avatar";
import { RouteNames } from "../../../constant/routes";

const handleTypeNotification = (formatTypeNotification) => {
  switch (formatTypeNotification) {
    case NotiType.LIKE_POST:
      return <Heart size={20} />;
    case NotiType.COMMENT_POST:
      return <MessageSquare size={20} />;
    case NotiType.SHARE_POST:
      return <Repeat size={20} />;
    case NotiType.NEW_FOLLOWER:
      return <Users size={20} />;
    case NotiType.NEW_MSG:
      return <Mail size={20} />;
    case NotiType.NEW_POST:
      return <Megaphone size={20} />;
    default:
      return "";
  }
};

const handleMessageNotification = (formatTypeNotification) => {
  switch (formatTypeNotification) {
    case NotiType.LIKE_POST:
      return "liked your post";
    case NotiType.COMMENT_POST:
      return "commented on your post";
    case NotiType.SHARE_POST:
      return "shared your post";
    case NotiType.NEW_FOLLOWER:
      return "started following you";
    case NotiType.NEW_MSG:
      return "sent you a message";
    case NotiType.NEW_POST:
      return "create new post !";
    default:
      return "";
  }
};

const notificationCardStyle = {
  color: "var(--color-dark)",
  width: "45%",
  minHeight: "5.5rem",
  border: "1px solid",
  borderRadius: "0.5rem",
};

const NotificationCard = ({ sender, type, isRead, createdAt }) => {
  const [notiInfo, setNotiInfo] = useState({
    senderName: "",
    profilePicture: "",
  });
  const dispatch = useDispatch();
  const formatTypeNotification = parseInt(type, 10);
  const formatTime = useTimeAgo;
  const navigate = useNavigate();

  const handleDirectlyLink = (link) => {
    navigate(link);
  };

  const handleNotificationClick = () => {
    if (!isRead && formatTypeNotification === NotiType.NEW_MSG) {
      handleDirectlyLink(RouteNames.MESSAGE_PAGE);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    getUserByID(sender, dispatch).then((data) => {
      if (data && !isCancelled) {
        const { username, profilePicture } = data?.user;
        setNotiInfo({
          senderName: username,
          profilePicture: profilePicture,
        });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [sender, dispatch]);

  return (
    <div
      className={`fs-4 animate__animated animate__fadeIn d-flex align-items-center p-3 position-relative ${
        !isRead && "bg-dark text-white"
      } my-2`}
      style={notificationCardStyle}
      onClick={handleNotificationClick}
      data-card
    >
      <div className="w-100" data-content>
        <div
          className="d-flex align-items-center justify-content-between mb-4"
          data-title
        >
          <div
            style={{
              color: "var(--color-dark)",
            }}
            className={`d-flex align-items-center fw-bold w-100 ${
              !isRead && "bg-dark text-white"
            }`}
          >
            {handleTypeNotification(formatTypeNotification)}
            <div className="d-flex align-items-center justify-content-between w-100">
              <Link
                to={`/user/${notiInfo.senderName ? sender : "404"}`}
                className="profile-pic ms-3"
              >
                <Avatar
                  imageSrc={notiInfo.profilePicture}
                  label={notiInfo.senderName}
                  userId={sender}
                />
              </Link>
              <div>{formatTime(createdAt)}</div>
            </div>
          </div>
        </div>

        <div data-content>
          <Link
            to={`/user/${notiInfo.senderName ? sender : "404"}`}
            className={`fw-bold me-1 sender-notification ${
              !isRead && "bg-dark text-white"
            } ${!notiInfo.senderName && "text-danger"}`}
          >
            {notiInfo.senderName || "This user not exist"}
          </Link>
          {handleMessageNotification(formatTypeNotification)}
        </div>
      </div>
    </div>
  );
};

export default memo(NotificationCard);
