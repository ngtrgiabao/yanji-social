import React, { useState } from "react";

import "./right.css";
import { UilEdit, UilSearch } from "@iconscout/react-unicons";

import { MessageData } from "../../data/MessageData";
import { FriendRequestData } from "../../data/FriendRequestData";

const Right = () => {
    const [choose, setChoose] = useState(false);
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

    const FriendRequestItem = (props) => {
        return (
            <div className="friend__request-item request">
                <div className="info">
                    <div className="profile-pic">
                        <img src={props.avatar} alt="" />
                    </div>
                    <div>
                        <h5>{props.name}</h5>
                        <p className="text-muted">
                            {props.numberOfMutalFriends} mutual friends
                        </p>
                    </div>
                </div>
                <div className="action d-flex">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn border-dark btn-light">Decline</button>
                </div>
            </div>
        );
    };

    return (
        <div className="right">
            <div
                className="messages"
                style={{
                    boxShadow: `${
                        choose ? "0 0 1rem var(--color-primary)" : ""
                    }`,
                }}
            >
                <div className="heading">
                    <h4>Messages</h4>
                    <UilEdit />
                </div>

                {/* SEARCH BAR */}
                <div className="search-bar">
                    <UilSearch />
                    <input
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
                ).map((item, index) => (
                    <MessageItem
                        key={item.id}
                        avatar={item.avatar}
                        name={item.name}
                        message={item.message}
                    ></MessageItem>
                ))}
            </div>
            {/* END OF MESSAGES */}

            {/* FRIEND REQUEST */}
            <div className="friend-request mt-3">
                <h4 className="my-3">Request</h4>

                {FriendRequestData.map((item, index) => (
                    <FriendRequestItem
                        key={item.id}
                        avatar={item.avatar}
                        name={item.name}
                    ></FriendRequestItem>
                ))}
            </div>
        </div>
    );
};

export default Right;
