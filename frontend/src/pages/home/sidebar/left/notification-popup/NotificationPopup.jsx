import React from "react";
import { NotificationData } from "../../../../../data/NotificationData";

import "animate.css";
import "../../../../../style/pages/home/sidebar/left/notificationPopup/notificationPopup.css";

const NotificationItem = (props) => {
    return (
        <div className="notification-item">
            <div className="profile-pic">
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={props.avatar}
                    alt="Avatar user"
                />
            </div>
            <div className="notification-body">
                <b>{props.name}</b>
                {props.notificationAlert}
                <small className="text-muted">{props.time}</small>
            </div>
        </div>
    );
};

function NotificationPopup() {
    return (
        <div className="d-flex">
            {NotificationData.map((item, index) => (
                <NotificationItem
                    key={item.id}
                    avatar={item.avatar}
                    name={item.name}
                    notificationAlert={item.notificationAlert}
                    time={item.time}
                />
            ))}
        </div>
    );
}

export default NotificationPopup;