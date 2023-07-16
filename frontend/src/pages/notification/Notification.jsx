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
        getNewNotification: useCallback(
            (data) => {
                setNotiList((prevNoti) => [data, ...prevNoti]);
            },
            [notiList]
        ),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("pushed-notification", handleSocket.getNewNotification);

        return () => {
            socket.off("pushed-notification", handleSocket.getNewNotification);
        };
    }, [handleSocket.getNewNotification]);

    useEffect(() => {
        getAllNotificationsByUser(currentUser._id, dispatch).then((data) => {
            const originalNotiList = data.data;

            console.log(data);
            setNotiList(originalNotiList);
        });
    }, []);

    const markSeenNoti = () => {
        notiList.map((noti) => {
            const updateNoti = {
                notiID: noti._id,
                isRead: true,
            };

            markSeenNotification(updateNoti, dispatch)
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
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
                className="position-absolute w-100 p-3 d-flex align-items-center justify-content-between fs-2 text-uppercase text-white"
                style={{
                    zIndex: "1",
                    background: "var(--color-primary)",
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
                }}
            >
                {notiList.length > 0 ? (
                    <div
                        className="d-flex flex-column align-items-center"
                        style={{
                            marginTop: "5.8rem",
                        }}
                    >
                        {notiList.map((noti) => (
                            <NotificationCard
                                key={noti._id}
                                sender={noti.sender}
                                type={noti.type}
                                notiID={noti._id}
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
