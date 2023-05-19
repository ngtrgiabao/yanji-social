import React, { useState, useEffect } from "react";

import axios from "axios";

import "../../style/pages/messages/messages.css";

import KAYO_AVATAR from "../../assets/avatar/kayo.jpg";

import Navigation from "../../layout/navigation/Navigation";
import Left from "./sidebar/left/Left";
import Middle from "./sidebar/middle/Middle";
import Right from "./sidebar/right/Right";

import { USER_URL } from "../../constants/api.data.constant";

function Messages() {
    const [avatarUser, setAvatarUser] = useState([]);

    useEffect(() => {
        const getDataUser = async () => {
            try {
                const response = await axios.get(USER_URL);
                const userData = response.data.results.map((user) => ({
                    id: user.login.uuid,
                    avatar: user.picture.large,
                    firstName: user.name.first,
                    lastName: user.name.last,
                }));
                setAvatarUser((prevData) => [...prevData, ...userData]);
            } catch (error) {
                console.error("Failed to get user data", error);
            }
        };

        getDataUser();
    }, []);

    return (
        <>
            <Navigation title="Login" link="/register" />
            <div className="messages">
                <Left avatarUser={KAYO_AVATAR} />
                <Middle avatarUser={avatarUser} />
                <Right />
            </div>
        </>
    );
}

export default Messages;
