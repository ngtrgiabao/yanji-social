import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
    COMMENT_POST,
    LIKE_POST,
    SHARE_POST,
} from "../constants/noti.type.constant";

import { getUserByID } from "../redux/request/userRequest";

const NotificationCard = ({ sender, type, notiID }) => {
    const [notiInfo, setNotiInfo] = useState({
        senderName: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        let isCancelled = false;

        getUserByID(sender, dispatch).then((data) => {
            if (!isCancelled) {
                const { username } = data.user;

                setNotiInfo({
                    senderName: username,
                });
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <div
            className="fs-4 animate__animated animate__fadeIn d-flex align-items-center border border-2 border-dark p-2 my-1"
            style={{
                borderRadius: "var(--card-border-radius)",
                color: "var(--color-black)",
                width: "45%",
                height: "5.5rem",
            }}
        >
            {notiInfo.senderName ? (
                <>
                    <Link to={"/user/" + sender}>{notiInfo.senderName}</Link> -{" "}
                    {(() => {
                        switch (parseInt(type, 10)) {
                            case LIKE_POST:
                                return "liked your post";
                            case COMMENT_POST:
                                return "commented on your post";
                            case SHARE_POST:
                                return "shared your post";
                            default:
                                return "";
                        }
                    })()}
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    );
};

export default NotificationCard;
