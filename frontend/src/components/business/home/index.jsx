import { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import Left from "./components/left";
import Middle from "./components/middle";
import Right from "./components/right";
import Header from "../../layouts/header";
import { useCurrentUser } from "../../../hooks";
import { getAllNotificationsByUser } from "../../../redux/request/notificationRequest";
import SocketEvent from "../../../constant/socket-event";
import Global from "../../../constant/global";
import { RouteNames } from "../../../constant/routes";
import { ToastProvider } from "../../../context/toast";

import "./home.css";

function Home({ socket }) {
  const currentUser = useCurrentUser();
  const [isReadNotification, setIsReadNotification] = useState(false);
  const dispatch = useDispatch();

  const handleSocket = {
    notification: useCallback(
      (data) => {
        const { receiver, sender, type } = data;

        if (receiver !== sender && receiver === currentUser?._id && type) {
          getAllNotificationsByUser(currentUser?._id, dispatch).then((data) => {
            const notificationList = data.data;
            const isGotNotification = Object.values(notificationList).some(
              (notification) => notification.isRead === false,
            );

            setIsReadNotification(isGotNotification);
          });
        }
      },
      [currentUser?._id, dispatch],
    ),
  };

  useEffect(() => {
    currentUser &&
      getAllNotificationsByUser(currentUser?._id, dispatch).then((data) => {
        if (data) {
          const isGotNotification = Object.values(data.data).some(
            (notification) => !notification.isRead,
          );

          setIsReadNotification(isGotNotification);
        }
      });
  }, [currentUser, dispatch]);

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.PUSHED_NOTIFICATION, handleSocket.notification);

    return () => {
      socket.off(SocketEvent.PUSHED_NOTIFICATION, handleSocket.notification);
    };
  }, [handleSocket.notification]);

  return (
    <>
      <ToastProvider />
      <Header title="Login" link={RouteNames.LOGIN} />

      <main>
        <div className="container">
          <Left socket={socket} isReadNotification={isReadNotification} />
          <Middle socket={socket} />
          <Right />
        </div>
      </main>
    </>
  );
}

export default memo(Home, isEqual);
