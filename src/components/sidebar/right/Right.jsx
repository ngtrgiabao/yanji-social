import React, { useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";

import "./right.css";
import Message from "./message/Message";

const Right = () => {
    const [choose, setChoose] = useState(false);

    return (
        <div className="right animate__animated animate__bounceInRight">
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
        </div>
    );
};

export default Right;
