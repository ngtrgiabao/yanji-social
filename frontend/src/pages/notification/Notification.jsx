import { useCallback, useEffect, useState } from "react";
import {
    getAllNotificationsByUser,
    markSeenNotification,
} from "../../redux/request/notificationRequest";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

import NotificationCard from "../../components/NotificationCard";

// TODO LOG ISREAD OF NOTIFICATION

const Notification = ({ socket }) => {
    const [notiList, setNotiList] = useState([]);
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });
    const dispatch = useDispatch();
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const handleSocket = {
        getNewNotification: useCallback((data) => {
            setNotiList((prevNoti) => [data, ...prevNoti]);
        }, []),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("pushed-notification", handleSocket.getNewNotification);

        return () => {
            socket.off("pushed-notification", handleSocket.getNewNotification);
        };
    }, [handleSocket.getNewNotification]);

    useEffect(() => {
        let isCancelled = false;

        getAllNotificationsByUser(currentUser._id, dispatch).then((data) => {
            if (!isCancelled) {
                const originalNotiList = data.data;
                const sortLatestNoti = [...originalNotiList].reverse();

                setNotiList(sortLatestNoti);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUser._id, dispatch]);

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
                    to="/"
                    className="fs-5 text-white text-decoration-underline"
                    onClick={() => markSeenNoti()}
                >
                    back to home
                </Link>
                <span className="fw-bold">notification</span>
            </div>
            <div
                className="h-100 overflow-auto scrollbar"
                style={{
                    maxHeight: "100vh",
                    background: "var(--color-white)",
                }}
            >
                {notiList.length > 0 ? (
                    <div
                        className="d-flex flex-column align-items-center"
                        style={{
                            margin: "6rem 0 1rem",
                        }}
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
                    </div>
                ) : (
                    <div className="fw-bold fs-2 h-100 d-flex justify-content-center align-items-center">
                        You don't have any notification ¯\_(ツ)_/¯
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;
