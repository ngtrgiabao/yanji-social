import React from "react";
import { NotificationData } from "../../../data/NotificationData";

import "animate.css";
import "./notificationPopup.css";

const NotificationItem = (props) => {
    return (
        <div className="notification-item">
            <div className="profile-pic">
                <img src={props.avatar} alt="" />
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
