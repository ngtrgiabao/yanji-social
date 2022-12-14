import React, { useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";

import "./right.css";
import FriendRequest from "./friendRequest/FriendRequest";
import Message from "./message/Message";

const Right = () => {
    const [choose, setChoose] = useState(false);

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

                <Message />
            </div>
            {/* FRIEND REQUEST */}
            <FriendRequest />
        </div>
    );
};

export default Right;
