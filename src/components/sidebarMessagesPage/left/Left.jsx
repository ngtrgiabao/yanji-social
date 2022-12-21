import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import "./left.css";

import API from "../../../api";

const Left = () => {
    const [avatar, setAvatar] = useState([]);

    useEffect(() => {
        const getDataUser = async () => {
            const userAvatar = await axios.get(API.USER_URL);

            userAvatar.data.results.forEach((user) => {
                setAvatar((pic) => [
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
            <div className="border left">
                <div className="left-container">
                    {/* HEADER */}
                    <div className="d-flex justify-content-between align-items-center fs-3 mb-4">
                        <div className="fs-2 fw-bold">Chat</div>
                        <div>
                            <span className="left-setting-chat__icon border rounded-circle">
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                            </span>
                        </div>
                    </div>
                    {/* MAIN */}
                    <div className="left-container-main">
                        <input
                            type="text"
                            placeholder="searching someone?"
                            className="fs-5 rounded border-0 mb-4"
                        />

                        <div className="d-flex mb-4">
                            <div className="border px-4 py-2 fs-4 rounded-3">
                                Box
                            </div>
                            <div className="border px-4 py-2 fs-4 rounded-3 ms-3">
                                Communites
                            </div>
                        </div>

                        <div className="messages-wrapper">
                            {avatar.map((item) => (
                                <div
                                    className="d-flex align-items-center message-item p-3"
                                    style={{ borderRadius: "1rem" }}
                                    key={item.id}
                                >
                                    <span className="profile-pic">
                                        <img src={item.avatar} alt="" />
                                    </span>
                                    <div className="message-body ms-3">
                                        <div className="fs-4 fw-bold">
                                            {item.lastName +
                                                " " +
                                                item.firstName}
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: "0" }}>
                                                hello
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Left;