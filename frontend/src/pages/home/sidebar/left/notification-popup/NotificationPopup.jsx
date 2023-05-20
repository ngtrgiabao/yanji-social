import React from "react";
import { NotificationData } from "../../../../../data/NotificationData";

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

const renderNotificationData = () => {
    return NotificationData.map((item, index) => (
        <NotificationItem
            key={index}
            avatar={item.avatar}
            name={item.name}
            notificationAlert={item.notificationAlert}
            time={item.time}
        />
    ));
};

const NotificationPopup = () => {
    return <div className="d-flex">{renderNotificationData()}</div>;
};

export default NotificationPopup;
