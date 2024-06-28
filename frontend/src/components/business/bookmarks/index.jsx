import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { io } from "socket.io-client";
import isEqual from "react-fast-compare";

import "./bookmarks.css";

import { getPostsSaved } from "../../../redux/request/userRequest";

import SocketEvent from "../../../constant/socket-event";
import Global from "../../../constant/global";
import { useCurrentUser } from "../../../hooks";
import { RouteNames } from "../../../constant/routes";
import Bookmark from "./components/bookmark";

const BookmarkList = ({ socket }) => {
  const currentUser = useCurrentUser();
  const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch();

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
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.DELETED_SAVED, handleSocket.deleteSaved);

    return () => {
      socket.off(SocketEvent.DELETED_SAVED, handleSocket.deleteSaved);
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
      <Link
        to={RouteNames.HOME}
        className="fs-3 link-underline d-flex align-items-center"
      >
        <MoveLeft size={15} className="me-2" /> Back to home
      </Link>
      {bookmarks.length > 0 ? (
        <div
          className="d-grid gap-2 py-4"
          style={{
            gridTemplateColumns: "repeat(4, minmax(30rem, 1fr))",
            height: "max-content",
          }}
          data-posts-saved-wrap
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
        Post deleted successfully
      </div>
    </div>
  );
};

export default memo(BookmarkList, isEqual);
