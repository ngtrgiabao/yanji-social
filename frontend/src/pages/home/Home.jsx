import { Suspense, lazy, useCallback, useEffect, useState } from "react";

import "./style/home.css";

import HomeLeft from "./HomeLeft";
import HomeMiddle from "./HomeMiddle";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationsByUser } from "../../redux/request/notificationRequest";

const Navigation = lazy(() => import("../../layout/navigation/Navigation"));

const Home = ({ socket }) => {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });

  const [isReadNotification, setIsReadNotification] = useState(false);
  const dispatch = useDispatch();

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

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
    socket = io(SOCKET_URL);

    socket.on("pushed-notification", handleSocket.notification);

    return () => {
      socket.off("pushed-notification", handleSocket.notification);
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
