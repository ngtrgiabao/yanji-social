import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Send } from "lucide-react";

import { commentPost } from "../../../redux/request/postRequest";
import { getAllCommentsByPostID } from "../../../redux/request/commentRequest";
import { pushNewNotification } from "../../../redux/request/notificationRequest";
import { getUserByID } from "../../../redux/request/userRequest";
import { NotiType } from "../../../constant/notification";
import SocketEvent from "../../../constant/socket-event";
import Global from "../../../constant/global";
import { useCurrentUser } from "../../../hooks";
import Avatar from "../avatar/Avatar";
import Comment from "./Comment";

const Comments = ({ postID, author, socket }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const handleSocket = {
    commentPost: useCallback(
      (data) => {
        const sortLatestComments = data.reverse();
        setComments(sortLatestComments);
      },
      [comments],
    ),
  };

  const fetchComments = () => {
    getAllCommentsByPostID(postID, dispatch).then((data) => {
      const { comments } = data;
      setComments(comments);
    });
  };

  useEffect(() => {
    fetchComments();
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.UPDATED_POST, (data) => {
      const { _id } = data;
      if (_id === postID) {
        fetchComments();
      }
    });
  }, []);

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.COMMENTED_POST, handleSocket.commentPost);

    return () => {
      socket.off(SocketEvent.COMMENTED_POST, handleSocket.commentPost);
    };
  }, [handleSocket.commentPost]);

  const handleComment = {
    commentPost: () => {
      const newComment = {
        _id: postID,
        userID: currentUser._id,
        postID: postID,
      };

      if (content) {
        newComment.content = content;
        commentPost(newComment, dispatch)
          .then(async (data) => {
            const { comments } = data.data;
            const updatePost = {
              _id: postID,
            };

            socket = io(Global.SOCKET_URL);

            await socket.emit(SocketEvent.UPDATE_POST, updatePost);
            await socket.emit(SocketEvent.COMMENT_POST, {
              comments: comments,
              postID: postID,
            });

            if (author._id !== currentUser._id) {
              const notification = {
                sender: currentUser._id,
                receiver: author._id,
                type: NotiType.COMMENT_POST,
              };

              pushNewNotification(notification, dispatch)
                .then((data) => {
                  socket.emit(SocketEvent.PUSH_NOTIFICATION, data.data);
                })
                .catch((err) => {
                  console.error("Failed to create new notification", err);
                });
            }
          })
          .catch((err) => {
            console.error("Failed to comment", err);
          });

        setContent("");
      }
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleComment.commentPost();
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const [user, setUser] = useState({
    profilePicture: "",
    username: "",
  });

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser._id, dispatch).then((data) => {
        const { profilePicture, username } = data.user;

        setUser({
          username: username,
          profilePicture: profilePicture,
        });
      });
  }, [currentUser, dispatch]);

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="d-flex align-items-center justify-content-between border-bottom pb-4 mb-4 w-100 rounded-0 p-0 overflowXHidden"
        style={{
          background: "unset",
          outline: "0",
        }}
      >
        <div className="profile-pic">
          <Avatar
            imageSrc={user.profilePicture}
            label={user.username}
            userId={author._id}
          />
        </div>
        <div className="flex-fill mx-2">
          <input
            type="text"
            className="fs-4 ms-2 p-2 px-4 w-100 border-0 bg-white text-black"
            placeholder="What you think this post"
            value={content}
            onChange={handleContent}
            style={{
              borderRadius: "0.5rem",
            }}
            maxLength={200}
          />
        </div>
        <button
          style={{
            width: "7%",
            background: "none",
          }}
          className="fs-3 p-2 border-0 text-white d-flex justify-content-center align-items-center"
          type="submit"
        >
          <Send size={20} />
        </button>
      </form>

      {/* Comment */}
      {comments.map((c) => (
        <Comment
          key={c._id}
          createdAt={c.createdAt}
          content={c.content}
          userCommented={c.userID}
          authorPost={author._id}
          postID={postID}
          commentID={c._id}
          socket={socket}
        />
      ))}
    </>
  );
};

export default Comments;
