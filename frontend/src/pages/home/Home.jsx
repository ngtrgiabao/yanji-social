import { Suspense, lazy, useCallback, useEffect, useState } from "react";

import "./styles/home.css";

import { HomeLeft, HomeMiddle } from "./components";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

import { getAllNotificationsByUser } from "../../redux/request/notificationRequest";
import SocketEvent from "../../constants/socket-event";
import {useCurrentUser} from "../../shared/hooks";

const Navigation = lazy(
  () => import("../../shared/layout/navigation/Navigation"),
);

import Global from "../../constants/global";

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
            const notiList = data.data;
            const isGotNotification = Object.values(notiList).some(
              (noti) => noti.isRead === false,
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
            (noti) => !noti.isRead,
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
      <Suspense fallback={null}>
        <Navigation title="Login" link="/login" />
      </Suspense>

      <main>
        <div className="container">
          <HomeLeft socket={socket} isReadNotification={isReadNotification} />
          <HomeMiddle socket={socket} />
        </div>
      </main>
    </>
  );
};

export default Home;
