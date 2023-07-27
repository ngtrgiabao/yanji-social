import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../../style/animations/snackbar.css";

import { getPostsSaved } from "../../redux/request/userRequest";
import Bookmark from "../../components/Bookmark";
import { io } from "socket.io-client";

const Bookmarks = ({ socket }) => {
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });
    const [bookmarks, setBookmarks] = useState([]);
    const dispatch = useDispatch();
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    useEffect(() => {
        getPostsSaved(currentUser._id, dispatch).then((data) => {
            const { postSaved } = data;
            setBookmarks(postSaved);
        });
    }, [currentUser._id, dispatch]);

    const handleSocket = {
        deleteSaved: useCallback(() => {
            getPostsSaved(currentUser._id, dispatch).then((data) => {
                const { postSaved } = data;
                setBookmarks(postSaved);
            });
        }, [currentUser._id, dispatch]),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("deleted-saved", handleSocket.deleteSaved);

        return () => {
            socket.off("deleted-saved", handleSocket.deleteSaved);
        };
    }, [handleSocket.deleteSaved]);

    const snackBar = useRef(null);

    const handleDeletePopup = () => {
        if (snackBar.current) {
            const sb = snackBar.current;
            sb.className = "show";

            setTimeout(() => {
                sb.className = sb.className.replace("show", "");
            }, 3000);
        }
    };

    const renderBookmarksList = () => {
        return bookmarks.map((b) => (
            <Bookmark
                key={b.postID}
                postID={b.postID}
                createdAt={b.createdAt}
                socket={socket}
                handleDeletePopup={handleDeletePopup}
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
                        gridTemplateColumns: "repeat(4, minmax(30rem, 1fr))",
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
                    You don't have saved anything ¯\_(ツ)_/¯
                </div>
            )}

            <div
                ref={snackBar}
                id="snackbar"
                style={{
                    backgroundColor: "var(--color-success)",
                }}
                className="fw-bold"
            >
                Deleted post successfully
            </div>
        </div>
    );
};

export default Bookmarks;
