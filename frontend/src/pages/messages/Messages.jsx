import React, { useState, useEffect } from "react";

import axios from "axios";

import "../../style/pages/messages/messages.css";

import Navigation from "../../layout/navigation/Navigation";
import Left from "./sidebar/left/Left";
import Middle from "./sidebar/middle/Middle";
import Right from "./sidebar/right/Right";

import { USER_URL } from "../../constants/api.data.constant";

function Messages() {
    const [avatarUser, setAvatarUser] = useState([]);

    useEffect(() => {
        const getDataUser = async () => {
            const userAvatar = await axios.get(USER_URL);

            userAvatar.data.results.forEach((user) => {
                setAvatarUser((pic) => [
                    ...pic,
                    {
                        id: user.login.uuid,
                        avatar: user.picture.large,
                        firstName: user.name.first,
                        lastName: user.name.last,
                    },
                ]);
            });
        };

        return getDataUser;
    }, []);

    return (
        <>
            <Navigation title="Login" link="/register" />
            <div className="messages">
                <Left avatarUser={avatarUser} />
                <Middle avatarUser={avatarUser} />
                <Right />
            </div>
        </>
    );
}

export default Messages;
