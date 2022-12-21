import React from "react";

import "./messages.css";

import Navigation from "../../components/navigation/Navigation";
import Left from "../../components/sidebarMessagesPage/left/Left";
import Middle from "../../components/sidebarMessagesPage/middle/Middle";
import Right from "../../components/sidebarMessagesPage/right/Right";

function Messages() {
    return (
        <>
            <Navigation />
            <div className="messages">
                <Left />
                <Middle />
                <Right />
            </div>
        </>
    );
}

export default Messages;
