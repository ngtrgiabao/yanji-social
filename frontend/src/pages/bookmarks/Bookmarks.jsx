import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

    const renderBookmarksList = () => {
        return bookmarks.map((b) => (
            <Bookmark
                key={b.postID}
                postID={b.postID}
                createdAt={b.createdAt}
            />
        ));
    };

    return (
        <div
            className="p-4"
            style={{
                height: "100vh",
            }}
        >
            <Link to="/" className="fs-3 link-underline">
                Back to home
            </Link>
            {bookmarks.length > 0 ? (
                <div
                    className="d-grid gap-2 py-4"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(30rem, 1fr))",
                        height: "max-content",
                    }}
                >
                    {renderBookmarksList()}
                </div>
            ) : (
                <div
                    className="fw-bold fs-1 w-100 d-flex justify-content-center align-items-center"
                    style={{
                        height: "95%",
                    }}
                >
                    You don't have any saved ¯\_(ツ)_/¯
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
