import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { Trash } from "lucide-react";

import { getUserByID } from "../../../redux/request/userRequest";
import { deleteComment } from "../../../redux/request/commentRequest";
import { useCurrentUser, useTimeAgo } from "../../../hooks";
import Global from "../../../constant/global";
import Avatar from "../avatar/Avatar";

const Comment = ({
  userCommented,
  createdAt,
  content,
  commentID,
  postID,
  authorPost,
  socket,
}) => {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    profilePicture: "",
  });
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formatTime = useTimeAgo;

  const currentUser = useCurrentUser();

  const handleComment = () => {
    setIsActive((isActive) => !isActive);
  };

  useEffect(() => {
    // Get info of each user commented in post
    userCommented &&
      getUserByID(userCommented, dispatch)
        .then((data) => {
          const { _id, username, profilePicture } = data?.user || {};
          setUser({
            _id: _id,
            username: username,
            profilePicture: profilePicture,
          });
        })
        .catch((err) => {
          console.log("[GET_USER_WHEN_COMMENTED]", err);
        });
  }, []);

  const deleteComments = () => {
    setIsLoading(true);
    deleteComment(commentID, dispatch).then(async () => {
      const updatePost = {
        _id: postID,
      };
      socket = io(Global.SOCKET_URL);

      await socket.emit("update-post", updatePost);

      setIsLoading(false);
    });
  };

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <div className="d-flex text-white flex-column pb-2 animate__animated animate__fadeIn my-4 overflowXHidden">
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to={"/user/" + userCommented}
          className="d-flex align-items-center"
        >
          <div className="profile-pic bg-white text-black">
            <Avatar
              imageSrc={user.profilePicture}
              label={user.username}
              userId={user?._id}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between flex-fill">
            <div className="ms-3 d-flex align-items-center justify-content-between">
              <div className="d-flex text-white fs-4 flex-column">
                <div className="fw-bold">
                  {user?._id === authorPost ? (
                    <>
                      <span className="author me-2">Author</span>@
                      {user.username}
                    </>
                  ) : (
                    `@${user.username}` || "user"
                  )}
                </div>
                <div>{formatTime(createdAt)}</div>
              </div>
            </div>
          </div>
        </Link>
        {currentUser._id === userCommented && (
          <Trash
            size={20}
            cursor="pointer"
            onClick={() => {
              handleComment();
              deleteComments();
            }}
          />
        )}
      </div>
      <div
        className="mt-2 fs-3 text-break border border-1 p-3"
        style={{
          marginLeft: "2.8em",
          borderRadius: "1rem",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Comment;
