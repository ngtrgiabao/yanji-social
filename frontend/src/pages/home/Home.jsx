import { Suspense, lazy, useCallback, useEffect, useState } from "react";

import "./styles/home.css";

import { HomeLeft, HomeMiddle, HomeRight } from "./components";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

import { getAllNotificationsByUser } from "../../redux/request/notificationRequest";
import SocketEvent from "../../helpers/constants/socket-event";
import { useCurrentUser } from "../../hooks";

const Navigation = lazy(
  () => import("../../shared/layout/navigation/Navigation"),
);

import Global from "../../helpers/constants/global";
import { ToastProvider } from "../../components/providers/toaster-provider";

const Home = ({ socket }) => {
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

    socket.on(SocketEvent["PUSHED_NOTIFICATION"], handleSocket.notification);

    return () => {
      socket.off(SocketEvent["PUSHED_NOTIFICATION"], handleSocket.notification);
    };
  }, [handleSocket.notification]);

  return (
    <>
      <ToastProvider />
      <Suspense fallback={null}>
        <Navigation title="Login" link="/login" />
      </Suspense>

      <main>
        <div className="container">
          <HomeLeft socket={socket} isReadNotification={isReadNotification} />
          <HomeMiddle socket={socket} />
          <HomeRight />
        </div>
      </main>
    </>
  );
};

export default Home;
