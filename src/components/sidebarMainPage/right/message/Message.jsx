import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import { UilSearch } from "@iconscout/react-unicons";

import "./message.css";
import { MessageData } from "../../../../data/MessageData";

function Message() {
    const [filterMessages, setFilterMessages] = useState("");

    const handleInputSearch = useCallback((e) => {
        setFilterMessages(e.target.value);
    });

    return (
        <div>
            {/* SEARCH BAR */}
            <div className="search-bar">
                <UilSearch />
                <Form.Control
                    type="search"
                    placeholder="Search messages-sidebar"
                    id="message-search"
                    onChange={handleInputSearch}
                />
            </div>

            {/* MESSAGES CATEGORY */}
            <div className="category">
                <h6 className="active">Primary</h6>
                <h6>General</h6>
                <h6 className="message-requests">Request(6)</h6>
            </div>

            {/* MESSAGES */}
            <div className="message-items">
                {/* FILTER NAME WHEN SEARCHING */}
                {MessageData.filter((user) =>
                    user.name.toLowerCase().includes(filterMessages)
                ).map((item) => (
                    <div className="message-item message-sidebar" key={item.id}>
                        <div className="profile-pic active">
                            <img src={item.avatar} alt="" />
                        </div>
                        <div className="message-body">
                            <h5>{item.name}</h5>
                            <p className="text-muted">{item.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Message;
