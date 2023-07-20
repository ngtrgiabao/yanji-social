import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostsSaved } from "../../redux/request/userRequest";
import Bookmark from "../../components/Bookmark";

const Bookmarks = () => {
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });
    const [bookmarks, setBookmarks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getPostsSaved(currentUser._id, dispatch).then((data) => {
            const { postSaved } = data;
            setBookmarks(postSaved);
        });
    }, [currentUser._id, dispatch]);

    return (
        <div
            className="d-flex justify-content-center align-items-center px-5"
            style={{
                height: "100vh",
            }}
        >
            <div
                className="d-grid gap-2"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(28rem, 1fr))",
                }}
            >
                {bookmarks.length > 0 ? (
                    bookmarks.map((b) => (
                        <Bookmark
                            key={b.postID}
                            postID={b.postID}
                            createdAt={b.createdAt}
                        />
                    ))
                ) : (
                    <div className="fw-bold fs-2 h-100 d-flex justify-content-center align-items-center">
                        You don't have any saved ¯\_(ツ)_/¯
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
