import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "lucide-react";
import isEqual from "react-fast-compare";

import "../../styles/messageRight.css";

import { getUserByID } from "../../../../../redux/request/userRequest";
import { Avatar } from "../../../../../components";
import { useCurrentRoom, useCurrentUser } from "../../../../../hooks";

const MessageRight = () => {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [friend, setFriend] = useState({
    id: "",
    username: "",
    profilePicture: "",
  });
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const currentRoom = useCurrentRoom();

  useEffect(() => {
    let isCancelled = false;

    if (currentRoom && !isCancelled) {
      const roomData = currentRoom.data;

      if (roomData?._id) {
        const { participants, _id } = roomData;
        const friendID = participants.find((id) => id !== currentUser._id);

        getUserByID(friendID, dispatch).then((data) => {
          const { username, profilePicture, _id } = data.user;

          setFriend({
            id: _id,
            username: username,
            profilePicture: profilePicture,
          });
        });

        setCurrentConversation(_id);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [currentRoom, currentUser._id, dispatch]);

  const renderAvatarUser = () => {
    return (
      <div className="d-flex flex-column align-items-center mb-4">
        <div
          className="right-container-header rounded rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
          style={{
            background: "var(--color-primary)",
          }}
        >
          <Avatar
            imageSrc={friend.profilePicture}
            label={friend.username}
            userId={friend.id}
          />
        </div>
        <p className="mt-2 mb-0 fs-4 fw-bold">{friend.username}</p>
      </div>
    );
  };

  const renderVisitProfile = () => {
    return (
      <div
        className="right-container-body fs-5"
        style={{
          width: "max-content",
        }}
      >
        <Link
          to={`/user/${friend.id}`}
          className="d-flex flex-column align-items-center"
          data-profile
        >
          <span
            className="p-3 text-center icon d-flex align-items-center"
            style={{
              borderRadius: "0.5rem",
            }}
          >
            <User size={20} className="me-2" />
            <span>Visit Profile</span>
          </span>
        </Link>
      </div>
    );
  };

  return (
    currentConversation && (
      <div className="right-msg-page p-4">
        <div className="right-container d-flex flex-column align-items-center">
          {renderAvatarUser()}
          {renderVisitProfile()}
        </div>
      </div>
    )
  );
};

export default memo(MessageRight, isEqual);
