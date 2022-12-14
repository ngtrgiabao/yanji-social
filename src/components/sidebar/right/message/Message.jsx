import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { UilSearch } from "@iconscout/react-unicons";

import "./message.css";
import { MessageData } from "../../../data/MessageData";

function Message() {
    const [filterMessages, setFilterMessages] = useState("");

    const MessageItem = (props) => {
        return (
            <div className="message-item message">
                <div className="profile-pic active">
                    <img src={props.avatar} alt="" />
                </div>
                <div className="message-body">
                    <h5>{props.name}</h5>
                    <p className="text-muted">{props.message}</p>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* SEARCH BAR */}
            <div className="search-bar">
                <UilSearch />
                <Form.Control
                    type="search"
                    placeholder="Search messages"
                    id="message-search"
                    onChange={(e) => setFilterMessages(e.target.value)}
                />
            </div>

            {/* MESSAGES CATEGORY */}
            <div className="category">
                <h6 className="active">Primary</h6>
                <h6>General</h6>
                <h6 className="message-requests">Request(6)</h6>
            </div>

            {/* MESSAGE */}
            {MessageData.filter((user) =>
                user.name.toLowerCase().includes(filterMessages)
            ).map((item) => (
                <MessageItem
                    key={item.id}
                    avatar={item.avatar}
                    name={item.name}
                    message={item.message}
                ></MessageItem>
            ))}
        </div>
    );
}

export default Message;
