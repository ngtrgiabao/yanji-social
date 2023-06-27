import React from "react";

import Comment from "./Comment";

const DetailsPost = ({ onPopup, animateClass, children, author, comments, postID }) => {
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
                    className="p-2 scrollbar"
                    style={{
                        overflowY: "scroll",
                        borderRadius: "1rem",
                    }}
                >
                    {children}
                    <Comment
                        author={author}
                        comments={comments}
                        postID={postID}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailsPost;
