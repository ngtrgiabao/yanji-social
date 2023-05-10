import React, { useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";

import "../../../../style/pages/home/sidebar/right/right.css";
import VideoIcon from "../../../../assets/icons/video.svg";

import Message from "./message/Message";

const Right = () => {
    const [choose, setChoose] = useState(false);

    return (
        <div className="right animate__animated animate__bounceInRight">
            <div
                className="messages-sidebar"
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

            <a
                href="https://meet-with-us.netlify.app/"
                className="mt-3 fs-3 d-flex align-items-center justify-content-center p-3 try-video-call__btn"
                style={{
                    borderRadius: "1rem",
                }}
            >
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={VideoIcon}
                    alt="Avatar user"
                    style={{
                        width: "10%",
                        height: "10%",
                    }}
                />
                <span className="d-block ms-4 text-bold">
                    Try our room video call now
                </span>
            </a>
        </div>
    );
};

export default Right;
