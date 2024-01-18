import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "../styles/messageRight.css";

import { useDispatch } from "react-redux";
import { getUserByID } from "../../../redux/request/userRequest";
import { Avatar } from "../../../components";
import {useCurrentUser} from "../../../shared/hooks";

const MessageRight = () => {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [friend, setFriend] = useState({
    id: "",
    username: "",
    profilePicture: "",
  });
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const currentRoom = useSelector((state) => {
    return state.room.room?.currentRoom;
  });

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
          <Avatar imageSrc={friend.profilePicture} label={friend.username} />
        </div>
        <p className="mt-2 mb-0 fs-4 fw-bold">{friend.username}</p>
      </div>
    );
  };

  const renderVisitProfile = () => {
    return (
      <div
        className="right-container-body fs-5 ms-3"
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
            className="p-3 text-center icon"
            style={{
              borderRadius: "0.5rem",
            }}
          >
            <FontAwesomeIcon icon={faUser} className="me-3" />
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

export default MessageRight;
