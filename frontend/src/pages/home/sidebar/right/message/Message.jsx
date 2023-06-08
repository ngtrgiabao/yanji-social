import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { UilSearch } from "@iconscout/react-unicons";
import { io } from "socket.io-client";

import "../../../../../style/pages/home/sidebar/right/message/message.css";

import KAYO_AVATAR from "../../../../../assets/avatar/kayo.jpg";

import { getRoomsByUserID } from "../../../../../redux/request/roomRequest";
import Conversation from "../../../../../components/Conversation";
import { getUserByID } from "../../../../../redux/request/userRequest";

function Message() {
    const [filterMessages, setFilterMessages] = useState("");

    const handleInputSearch = useCallback((e) => {
        setFilterMessages(e.target.value);
    });

    const [rooms, setRooms] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socketRef = useRef(null);
    const dispatch = useDispatch();

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const renderFilterData = () => {
        return rooms.map((r) => (
            <div key={r._id} className="message-item message-sidebar">
                <Conversation
                    onlineUsers={onlineUsers}
                    conversation={r}
                    currentUser={sender._id}
                    avatarUser={KAYO_AVATAR}
                    filterMessages={filterMessages}
                />
            </div>
        ));
    };

    // useEffect(() => {
    //     console.log(onlineUsers);
    // }, [onlineUsers]);

    return (
        <>
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
            <div className="message-items scrollbar">
                {/* FILTER NAME WHEN SEARCHING */}
                {renderFilterData()}
            </div>
        </>
    );
}

export default Message;
