import { useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

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
            <div className="d-flex flex-column align-items-center">
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
                <div className="mt-2 w-100 d-flex flex-column align-items-center px-5">
                    <span>
                        &copy; Copyright by <b>Nguyen Tran Gia Bao</b> (Yanji)
                        2023
                    </span>
                    <ul className="fs-1 d-flex justify-content-between w-25 p-0 contact-list">
                        <li
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <a
                                href="https://www.linkedin.com/in/gbao/"
                                target="_blank"
                                //  The rel="noopener noreferrer" attribute is a best practice for security and performance when using target="_blank".
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </li>
                        <li
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <a
                                href="https://github.com/ngtrgiabao"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Right;
