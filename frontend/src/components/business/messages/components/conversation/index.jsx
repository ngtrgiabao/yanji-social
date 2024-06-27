import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import isEqual from "react-fast-compare";

import { getUserByID } from "../../../../../redux/request/userRequest";
import { Avatar } from "../../../../ui";

const Conversation = ({
  conversation,
  currentUser,
  onlineUsers,
  filterMessages,
}) => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useDispatch();

  const friendID = conversation.participants.find((p) => p !== currentUser);

  useEffect(() => {
    let isCancelled = false;

    // Set list friends to apply online symbol
    getUserByID(currentUser, dispatch).then((data) => {
      if (!isCancelled) {
        const { followers, followings } = data.user;

        if (followings.length > 0) {
          setFriends(followings);
        } else if (followers.length > 0) {
          setFriends(followers);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentUser, dispatch]);

  // Get info friend
  useEffect(() => {
    let isCancelled = false;

    getUserByID(friendID, dispatch).then((data) => {
      if (!isCancelled && data) {
        setUser(data.user);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentUser, conversation, friendID, dispatch]);

  // Loop to set online symbol
  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      friends.forEach((friend) => {
        if (onlineUsers.includes(friend) && friend === user?._id) {
          setIsOnline(true);
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [friends, onlineUsers, isOnline, user?._id]);

  const renderAvatarUser = () => {
    return (
      <span
        className={`avatar-user d-flex justify-content-center align-items-center text-white ${
          isOnline && user ? "online-status" : ""
        }`}
        style={{
          background: "var(--color-primary)",
        }}
      >
        <Avatar
          imageSrc={user?.profilePicture}
          label={user?.username}
          userId={user?._id}
        />
      </span>
    );
  };

  const renderMessageBodyElement = () => {
    return (
      <div className="message-body ms-3">
        <div className="fs-3 fw-bold">{user?.username}</div>
      </div>
    );
  };

  const renderMessageBlock = () => {
    if (
      filterMessages &&
      !user.username.toLowerCase().includes(filterMessages)
    ) {
      return null;
    }

    return (
      <div className="d-flex w-100 align-items-center">
        {renderAvatarUser()}
        {renderMessageBodyElement()}
      </div>
    );
  };

  const MessageItem = () => {
    const showItem = user?.username.toLowerCase().includes(filterMessages);

    return (
      <div
        className={`message-item py-3 px-2 ${
          showItem ? "d-flex flex-column" : "d-none"
        } mb-2`}
        style={{
          borderRadius: "1rem",
        }}
      >
        {renderMessageBlock()}
      </div>
    );
  };

  return MessageItem();
};

export default memo(Conversation, isEqual);
