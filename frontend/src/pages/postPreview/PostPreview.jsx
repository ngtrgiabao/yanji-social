import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { getPostByID } from "../../redux/request/postRequest";
import _404 from "../_404/_404";
import { DetailsPost, Post } from "../../components";
import { getUserByID } from "../../redux/request/userRequest";
import SocketEvent from "../../constants/socket-event";

import "../../styles/animations/snackbar.css";

const PostPreview = ({ socket }) => {
  const postRoute = useParams().postID;
  const [isValid, setIsValid] = useState(true);
  const [postRoutePage, setPostRoutePage] = useState({});
  const [user, setUser] = useState({
    _id: "",
    username: "",
    profilePicture: "",
  });
  const snackBar = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getPostByID(postRoute, dispatch).then((data) => {
      if (data) {
        setIsValid(true);

        setPostRoutePage(data.data);
      } else {
        setIsValid(false);
      }
    });
  }, [postRoute, dispatch]);

  useEffect(() => {
    getUserByID(postRoutePage.userID, dispatch).then((data) => {
      const { _id, username, profilePicture } = data?.user || {};

      setUser({
        _id: _id,
        username: username,
        profilePicture: profilePicture,
      });
    });
  }, [postRoutePage.userID, dispatch]);

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

  const handleSocket = {
    updatePost: useCallback(() => {
      getPostByID(postRoutePage._id, dispatch).then((data) => {
        setPostRoutePage(data.data);
      });
    }, [postRoutePage._id, dispatch]),
  };

  useEffect(() => {
    socket = io(SOCKET_URL);

    socket.on(SocketEvent["UPDATED_POST"], handleSocket.updatePost);

    return () => {
      socket.off(SocketEvent["UPDATED_POST"], handleSocket.updatePost);
    };
  }, [handleSocket.updatePost, socket]);

  const handleDeletePostPopup = () => {
    if (snackBar.current) {
      const sb = snackBar.current;
      sb.className = "show";

      setTimeout(() => {
        sb.className = sb.className.replace("show", "");
        window.location.reload();
      }, 3000);
    }
  };

  return isValid ? (
    postRoutePage && (
      <>
        <div
          className="posts"
          style={{
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          <DetailsPost
            author={user}
            postID={postRoute}
            socket={socket}
            extendClass="bg-white"
            children={
              <Post
                image={postRoutePage.img}
                video={postRoutePage.video}
                postID={postRoutePage._id}
                userID={postRoutePage.userID}
                createdAt={postRoutePage.createdAt}
                updatedAt={postRoutePage.updatedAt}
                desc={postRoutePage.desc}
                likes={postRoutePage.likes}
                shares={postRoutePage.shares}
                comments={postRoutePage.comments}
                isDisableComment={true}
                handleDeletePopup={handleDeletePostPopup}
                socket={socket}
              />
            }
          />
        </div>

        <div id="snackbar" ref={snackBar} className="fw-bold">
          Deleted post :D
        </div>
      </>
    )
  ) : (
    <_404 />
  );
};

export default PostPreview;
