import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { BookmarkCheck } from "lucide-react";
import isEqual from "react-fast-compare";

import LoadingPage from "../../../../common/loading/loading-page";
import { getPostByID } from "../../../../../redux/request/postRequest";
import { useCurrentUser, useTimeAgo } from "../../../../../hooks";
import {
  getPostsSaved,
  getUserByID,
  updateUser,
} from "../../../../../redux/request/userRequest";
import { BG_DEFAULT_WALLPAPER_USER } from "../../../../../assets";
import Avatar from "../../../../ui/avatar/Avatar";
import Global from "../../../../../constant/global";

const Bookmark = ({
  postID,
  createdAt,
  socket,
  handleDeletePopup = () => {},
}) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    desc: "",
    likes: 0,
    img: "",
    video: "",
    isExisting: false,
  });
  const [author, setAuthor] = useState({
    username: "",
    avatar: "",
    authorID: "",
  });
  const formatTime = useTimeAgo;
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const handleVisitLink = (link) => {
    navigate(link);
  };

  const handleUser = {
    update: (updateData) => {
      updateUser(updateData, dispatch)
        .then(() => {
          socket = io(Global.SOCKET_URL);

          socket.emit("delete-saved", { postID: postID });
        })
        .catch((err) => {
          console.error("Failed to save", err);
        });
    },
  };

  const handlePost = useMemo(
    () => ({
      getAuthor: (userID, desc, likes, img, video) => {
        getUserByID(userID, dispatch).then((data) => {
          const { username, _id, profilePicture } = data.user;
          setPost({
            desc: desc,
            likes: likes.length,
            img: img,
            video: video,
            isExisting: true,
          });
          setAuthor({
            username: username,
            avatar: profilePicture,
            authorID: _id,
          });
        });
      },
    }),
    [dispatch],
  );

  const handleDeletePostSaved = (postID) => {
    const updatedUser = {
      userID: currentUser._id,
      postSaved: { postID: postID },
    };

    handleUser.update(updatedUser);
  };

  useEffect(() => {
    getPostByID(postID, dispatch).then((data) => {
      if (data) {
        const { desc, likes, img, video, userID } = data.data;

        handlePost.getAuthor(userID, desc, likes, img, video);
      } else {
        setAuthor({
          avatar: BG_DEFAULT_WALLPAPER_USER,
          authorID: "null",
          username: "This post has been deleted :<",
        });
      }
    });
  }, [postID, dispatch, handlePost]);

  return (
    <div className="card shadow-sm bg-body-tertiary text-black h-100 w-100">
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{
          height: "28rem",
        }}
      >
        {author.authorID ? (
          <div className="h-100 d-flex flex-column justify-content-between">
            <div
              className="card-title fs-4 fw-bold d-flex align-items-center justify-content-between w-100"
              style={{
                color: "var(--color-primary)",
                width: "max-content",
              }}
              data-title
            >
              <div
                className="d-flex align-items-center"
                onClick={() => handleVisitLink(`/user/${author.authorID}`)}
              >
                <div
                  className="profile-pic bg-black text-white me-2"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    imageSrc={author.avatar}
                    label={author.username}
                    userId={author.authorID}
                  />
                </div>
                <span className="link-underline ">{author.username}</span>
              </div>

              <BookmarkCheck
                size={20}
                cursor="pointer"
                onClick={() => handleDeletePostSaved(postID)}
              />
            </div>

            {post.isExisting ? (
              <div
                className="caption overflow-hidden fw-light fs-4 d-flex flex-column link-underline"
                style={{
                  height: "20rem",
                  color: "unset",
                }}
                onClick={() => handleVisitLink(`/post/${postID}`)}
                data-content
              >
                {post.desc}
                {post.img && (
                  <img
                    src={post.img}
                    alt="post_image"
                    className="w-100"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
                {post.video && <video src={post.video}></video>}
              </div>
            ) : (
              <div
                className="fs-3 d-flex justify-content-center align-items-center"
                style={{
                  height: "20rem",
                }}
              >
                <button
                  className="p-2 border-0 bg-danger text-white"
                  style={{
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => {
                    handleDeletePostSaved(postID);
                    handleDeletePopup();
                  }}
                >
                  Delete this post ?
                </button>
              </div>
            )}

            <p data-time className="card-text mt-3">
              <small className="text-body-secondary">
                Saved {formatTime(createdAt)}
              </small>
            </p>
          </div>
        ) : (
          <LoadingPage />
        )}
      </div>
    </div>
  );
};

export default memo(Bookmark, isEqual);
