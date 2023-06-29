import React from "react";

import Comments from "./Comments";

const DetailsPost = ({
    onPopup,
    animateClass,
    children,
    author,
    postID,
    socket,
}) => {
    return (
        <div
            onClick={(e) => onPopup(e)}
            className={
                "d-flex justify-content-center align-items-center post-popup__container text-white"
            }
        >
            <div
                className="d-flex justify-content-center align-items-center flex-column h-75 w-50 py-3 px-4"
                onClick={(e) => e.stopPropagation()}
                style={{
                    borderRadius: "1rem",
                    background: "var(--color-primary-light)",
                    color: "var(--color-dark)",
                }}
            >
                <p className="fs-3 fw-bold mb-1 text-white">
                    Bài viết từ {author.username}
                </p>
                <div
                    className="p-2 scrollbar w-100"
                    style={{
                        overflowY: "scroll",
                        borderRadius: "1rem",
                    }}
                >
                    {children}
                    <Comments postID={postID} author={author} socket={socket} />
                </div>
            </div>
        </div>
    );
};

export default DetailsPost;
