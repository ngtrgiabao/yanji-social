import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import isEqual from "react-fast-compare";

import {
  getRoomsByUserID,
  getCurrentRoom,
} from "../../../../../redux/request/roomRequest";
import { getUserByID } from "../../../../../redux/request/userRequest";
import SocketEvent from "../../../../../constant/socket-event";
import Global from "../../../../../constant/global";
import { useCurrentUser } from "../../../../../hooks";
import Conversation from "../conversation";

import "../../styles/messageLeft.css";

const MessageLeft = ({ socket = {} }) => {
  const [rooms, setRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [friendID, setFriendID] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [filterMessages, setFilterMessages] = useState("");
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  useEffect(() => {
    let isCancelled = false;
    getRoomsByUserID(dispatch, currentUser._id)
      .then((data) => {
        if (!isCancelled) {
          setRooms(data.rooms); // Set rooms directly
        }
      })
      .catch((error) => {
        console.error("Failed to get rooms", error);
      });

    return () => {
      isCancelled = true;
    };
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (currentChat) {
      getCurrentRoom(dispatch, currentChat);
    }
  }, [currentChat, dispatch]);

  useEffect(() => {
    if (friendID) {
      getUserByID(friendID, dispatch);
    }
  }, [friendID, dispatch]);

  const handleSocket = {
    getUsersOnline: useCallback(
      (userList) => {
        const users = Object.values(userList);

        // Get friends of currentUser to compare user of socket to set online users
        getUserByID(currentUser._id, dispatch)
          .then((data) => {
            const { followers, followings } = data.user;

            if (followers.length > 0) {
              const value = followers.filter((f) =>
                users.some((u) => u.userID === f),
              );
              setOnlineUsers(value);
            } else if (followings.length > 0) {
              const value = followings.filter((f) =>
                users.some((u) => u.userID === f),
              );
              setOnlineUsers(value);
            }
          })
          .catch((err) => {
            console.error("Failed to get user online", err);
          });
      },
      [currentUser._id, dispatch],
    ),
  };

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.emit(SocketEvent.ADD_USER, {
      user: currentUser._id,
    });

    socket.on(SocketEvent.GET_USERS, handleSocket.getUsersOnline);

    return () => {
      socket.off(SocketEvent.GET_USERS, handleSocket.getUsersOnline);
    };
  }, [handleSocket.getUsersOnline, currentUser._id]);

  const renderRooms = () => {
    return rooms.map((r) => (
      <div
        key={r._id}
        onClick={() => {
          setCurrentChat(r._id);
          setFriendID(
            r.participants.filter((user) => user !== currentUser._id),
          );
        }}
        className="messages-wrapper__room-list"
      >
        <Conversation
          onlineUsers={onlineUsers}
          conversation={r}
          currentUser={currentUser._id}
          filterMessages={filterMessages}
        />
      </div>
    ));
  };

  const handleFilterMessages = (e) => {
    setFilterMessages(e.target.value);
  };

  return (
    <>
      <div className="left-msg-page overflow-hidden">
        <div className="left-container">
          <div className="left-container-main">
            <input
              type="text"
              placeholder="Finding someone?"
              className="fs-3 rounded border-0 mb-4"
              onChange={handleFilterMessages}
            />

            <div className="messages-wrapperr overflow-auto h-100">
              {renderRooms()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MessageLeft, isEqual);
