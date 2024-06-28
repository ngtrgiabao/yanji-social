import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import isEqual from "react-fast-compare";

import {
  getAllNotificationsByUser,
  markSeenNotification,
} from "../../../redux/request/notificationRequest";
import { NotificationCard } from "../../../components";
import SocketEvent from "../../../constant/socket-event";
import Global from "../../../constant/global";
import { useCurrentUser } from "../../../hooks";
import { RouteNames } from "../../../constant/routes";

const Notification = ({ socket }) => {
  const [notiList, setNotiList] = useState([]);
  const currentUser = useCurrentUser();
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();

  const handleSocket = {
    getNewNotification: useCallback((data) => {
      setNotiList((prevNoti) => [data, ...prevNoti]);
    }, []),
  };

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.PUSHED_NOTIFICATION, handleSocket.getNewNotification);

    return () => {
      socket.off(
        SocketEvent.PUSHED_NOTIFICATION,
        handleSocket.getNewNotification,
      );
    };
  }, [handleSocket.getNewNotification]);

  const markSeenNoti = () => {
    notiList.forEach((noti) => {
      const updateNoti = {
        notiID: noti._id,
        isRead: true,
      };

      markSeenNotification(updateNoti, dispatch).catch((err) => {
        console.error("Failed to mark seen", err);
      });
    });
  };

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchMoreNoti = useCallback(async () => {
    getAllNotificationsByUser(currentUser._id, dispatch).then(async (data) => {
      if (data.data.length > 0) {
        const res = await axios.get(
          Global.SOCKET_URL +
            `/api/v1/notification/all/user/${currentUser._id}/?limit=5&skip=${
              page * 5
            }`,
        );

        const { data } = res.data;

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setNotiList((prevNoti) => [...prevNoti, ...data]);
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        setIsEmpty(true);
      }
    });
  }, [currentUser._id, page, dispatch]);

  const onIntersection = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        fetchMoreNoti();
      }
    },
    [fetchMoreNoti, hasMore],
  );

  const loadingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [notiList, onIntersection]);

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="position-relative overflow-hidden"
    >
      <div
        className="position-absolute w-100 p-3 d-flex align-items-center justify-content-between fs-2 text-uppercase text-white border-bottom border-white"
        style={{
          background: "var(--color-primary)",
          zIndex: "1",
        }}
      >
        <Link
          to={RouteNames.HOME}
          className="fs-5 text-white text-decoration-underline d-flex align-items-center"
          onClick={() => markSeenNoti()}
        >
          <MoveLeft size={15} className="me-2" /> Back to home
        </Link>
        <span className="fw-bold">notification</span>
      </div>
      <div
        className="h-100 overflow-auto"
        style={{
          maxHeight: "100vh",
          background: "var(--color-white)",
        }}
      >
        {isEmpty ? (
          <div className="fw-bold fs-2 h-100 d-flex justify-content-center align-items-center">
            You don't have any notification ¯\_(ツ)_/¯
          </div>
        ) : (
          <div
            className="d-flex flex-column align-items-center"
            style={{
              margin: "6rem 0 1rem",
            }}
            data-notifications
          >
            {notiList.map((noti) => (
              <NotificationCard
                key={noti._id}
                sender={noti.sender}
                isRead={noti.isRead}
                type={noti.type}
                createdAt={noti.createdAt}
              />
            ))}

            {currentUser && hasMore && (
              <div
                className="d-flex justify-content-center fs-3 fw-bold my-3"
                ref={loadingRef}
              >
                Loading...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Notification, isEqual);
