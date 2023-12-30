import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UilEllipsisH, UilTrash } from "@iconscout/react-unicons";
import {
  faHeart as likeDefault,
  faComment,
  faPenToSquare,
  faBookmark as bookmarkDefault,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as liked,
  faRepeat,
  faBookmark as bookmarked,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

import { BG_DEFAULT_WALLPAPER_USER } from "../assets";

import "./style/post.css";

import { deletePost, likePost, sharePost } from "../redux/request/postRequest";
import {
  getPostsShared,
  getUserByID,
  updateUser,
} from "../redux/request/userRequest";
import { useTimeAgo } from "../hooks";
import DetailsPost from "./DetailsPost";
import ParagraphWithLink from "./ParagraphWithLink";
import EditPopup from "./EditPopup";
import { pushNewNotification } from "../redux/request/notificationRequest";
import { LIKE_POST, SHARE_POST } from "../business/noti.type";
import ConfirmDialog from "./ConfirmDialog";

// TODO CHECK SPAM IN LIKE, SHARE, COMMENT
// TODO FIX POPUP WHEN DELETE POST NOT WORK CORRECTLY

const Post = ({
  image,
  video,
  postID,
  userID,
  createdAt,
  updatedAt,
  desc,
  likes,
  shares,
  comments,
  socket,
  handleDeletePopup = () => {},
  isDisableComment = false,
}) => {
  const [popup, setPopup] = useState("");
  const [user, setUser] = useState({
    _id: "",
    username: "",
    profilePicture: "",
    isVerify: false,
  });
  const [postShared, setPostShared] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const formatTime = useTimeAgo;

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

  // Update title to edited when post has been edited
  useEffect(() => {
    let isCancelled = false;

    getPostsShared(currentUser?._id, dispatch).then((data) => {
      if (!isCancelled && data) {
        const { postShared } = data;
        setPostShared(postShared.map((p) => p.postID));
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentUser, dispatch]);

  useEffect(() => {
    const handleClickOutside = () => {
      setPopup("");
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [popup]);

  useEffect(() => {
    let isCancelled = false;

    getUserByID(userID, dispatch)
      .then((data) => {
        if (!isCancelled) {
          const { _id, username, profilePicture, isVerify } = data?.user || {};

          setUser({
            _id: _id,
            username: username,
            profilePicture: profilePicture,
            isVerify: isVerify,
          });
        }
      })
      .catch((err) => {
        console.error("Failed", err);
      });

    return () => {
      isCancelled = true;
    };
  }, [userID, dispatch]);

  useEffect(() => {
    let isCancelled = false;

    getUserByID(currentUser?._id, dispatch)
      .then((data) => {
        if (!isCancelled && data) {
          const { postSaved } = data.user || {};
          const isSavedPost = postSaved.some((post) => post.postID === postID);

          setIsSaved(isSavedPost);
        }
      })
      .catch((err) => {
        console.error(
          `Failed to get post saved of user ${currentUser?._id}`,
          err,
        );
      });

    return () => {
      isCancelled = true;
    };
  }, [currentUser?._id, dispatch, postID]);

  const handleSetting = (e) => {
    e.stopPropagation();
    if (popup !== "SETTING") {
      setPopup("SETTING");
    } else {
      setPopup("");
    }
  };

  const handleDetailsPost = (e) => {
    e.stopPropagation();
    if (popup !== "DETAILS") {
      setPopup("DETAILS");
    } else {
      setPopup("");
    }
  };

  const handleEditPost = () => {
    if (popup !== "EDIT") {
      setPopup("EDIT");
    } else {
      setPopup("");
    }
  };

  const post = {
    userID: currentUser?._id,
    postID: postID,
  };

  const handlePost = {
    likePost: () => {
      likePost(post, dispatch)
        .then(async (data) => {
          socket = io(SOCKET_URL);

          await socket.emit("update-post", data.data);

          const { isLiked } = data;

          if (isLiked && user?._id !== currentUser?._id) {
            const notification = {
              sender: currentUser?._id,
              receiver: user?._id,
              type: LIKE_POST,
            };

            pushNewNotification(notification, dispatch)
              .then((data) => {
                socket.emit("push-notification", data.data);
              })
              .catch((err) => {
                console.error("Failed to create new notification", err);
              });
          }
        })
        .catch((error) => {
          console.error("Failed to like post", error);
        });
    },
    sharePost: async () => {
      sharePost(post, dispatch)
        .then(async (data) => {
          socket = io(SOCKET_URL);
          await socket.emit("update-post", data.data);

          const { isShared } = data;

          if (isShared && user?._id !== currentUser?._id) {
            const notification = {
              sender: currentUser?._id,
              receiver: user?._id,
              type: SHARE_POST,
            };

            pushNewNotification(notification, dispatch)
              .then((data) => {
                socket.emit("push-notification", data.data);
              })
              .catch((err) => {
                console.error("Failed to create new notification", err);
              });
          }
        })
        .catch((error) => {
          console.error("Failed to share post", error);
        });
    },
    savePost: async (postID) => {
      const updatedUser = {
        userID: currentUser?._id,
        postSaved: { postID: postID },
      };

      updateUser(updatedUser, dispatch)
        .then(() => {
          setIsSaved((isSaved) => !isSaved);
        })
        .catch((err) => {
          console.error("Failed to save", err);
        });
    },
    deletePost: async (postID) => {
      deletePost(postID, dispatch)
        .then(async (data) => {
          socket = io(SOCKET_URL);
          await socket.emit("delete-post", data?.data);
        })
        .catch((error) => {
          console.error("Failed to delete post", error);
        });

      handleDeletePopup();
    },
  };

  const renderEditPost = () => {
    return (
      <div className="edit-post" hidden={popup !== "SETTING"}>
        <ul>
          <li className="delete-post" onClick={() => setActive("DELETE_POST")}>
            <span>
              <UilTrash />
            </span>
            Delete this post
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleEditPost();
            }}
          >
            <span className="fs-2">
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            Edit this post
          </li>
        </ul>
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <div
          className="user"
          title={
            user?._id === currentUser?._id
              ? `Truy cập trang cá nhân`
              : `Truy cập trang cá nhân ${user.username}`
          }
        >
          <Link
            to={`/user/${user?._id}`}
            className="profile-pic bg-black text-white"
            aria-label="Avatar user"
          >
            {user.profilePicture ? (
              <img
                loading="lazy"
                role="presentation"
                decoding="async"
                src={user.profilePicture || BG_DEFAULT_WALLPAPER_USER}
                alt="Avatar user"
                className="w-100"
              />
            ) : (
              user.username
            )}
          </Link>
          <Link to={`/user/${user?._id}`} className="info">
            <div className="d-flex align-items-center fs-5">
              <div className="fw-bold d-flex align-items-center">
                {user.username}
                {user.isVerify && (
                  <FontAwesomeIcon
                    className="ms-2 bg-white rounded rounded-circle text-primary"
                    icon={faCircleCheck}
                    style={{
                      fontSize: "1rem",
                    }}
                  />
                )}
              </div>
              <div className="ms-2 fw-light">
                {formatTime(createdAt) || "now"}
              </div>
            </div>
            <span>
              <>@{user.username}</>
            </span>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={isSaved ? bookmarked : bookmarkDefault}
            className="fs-4 me-2"
            title="Save this post"
            style={{
              cursor: "pointer",
            }}
            onClick={() => handlePost.savePost(postID)}
          />
          {user?._id === currentUser?._id && (
            <span className="post-settings" title="Setting post">
              <UilEllipsisH
                className="dots"
                onClick={(e) => {
                  handleSetting(e);
                }}
              />
              {renderEditPost()}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderActionBtn = () => {
    return (
      <div className="action-buttons d-flex justify-content-between align-items-center fs-3 border-top pt-3">
        <div className="interaction-buttons d-flex justify-content-between w-100 align-items-center gap-4">
          <span
            className="d-flex justify-content-center align-items-center share flex-fill p-1 post-action__btn rounded-2"
            onClick={() => handlePost.sharePost()}
            title="Share"
            data-share
          >
            <span>
              {shares?.includes(currentUser?._id) ? (
                <FontAwesomeIcon
                  icon={faRepeat}
                  style={{
                    color: "var(--color-blue)",
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={faRepeat} />
              )}
            </span>
            <div className="ms-2">
              <b>{shares?.length}</b>
            </div>
          </span>
          <span
            className="d-flex justify-content-center align-items-center comment flex-fill p-1 post-action__btn rounded-2"
            onClick={(e) => {
              e.stopPropagation();
              !isDisableComment && handleDetailsPost(e);
            }}
            title="Comment"
            data-comment
          >
            <span>
              <FontAwesomeIcon icon={faComment} />
            </span>
            <div className="ms-2">
              <b>{comments?.length}</b>
            </div>
          </span>
          <span
            className="d-flex justify-content-center align-items-center heart flex-fill p-1 post-action__btn rounded-2 overflow-hidden"
            onClick={() => handlePost.likePost()}
            title="Like"
            data-like
          >
            <span>
              {likes?.includes(currentUser?._id) ? (
                <FontAwesomeIcon
                  icon={liked}
                  style={{
                    color: "crimson",
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={likeDefault} />
              )}
            </span>
            <div className="ms-2">
              <b>{likes?.length}</b>
            </div>
          </span>
        </div>
      </div>
    );
  };

  const renderPopupConfirmDeletePost = () => {
    return (
      active === "DELETE_POST" && (
        <ConfirmDialog
          title="Bạn muốn xóa bài viết này?"
          onClose={() => setActive("")}
          onConfirm={() => handlePost.deletePost(postID)}
          confirmButtonText="Delete"
        />
      )
    );
  };

  const renderPost = () => {
    return (
      <div className="post mb-4 position-relative">
        <div className="head">{renderTitle()}</div>
        <div
          className="caption fs-3 my-3 overflow-auto"
          style={{
            maxHeight: "44rem",
          }}
        >
          <ParagraphWithLink text={desc} />
        </div>
        {image && (
          <div className="photo">
            <img
              loading="lazy"
              role="presentation"
              decoding="async"
              src={image}
              alt="Media of post"
              className="w-100 h-100"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {video && (
          <div
            className="photo"
            style={{
              height: "30rem",
            }}
          >
            <video
              preload="metadata"
              className="w-100"
              ref={videoRef}
              controls
              draggable="false"
              muted
              autoPlay
              loop
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {renderActionBtn()}

        {renderPopupConfirmDeletePost()}
      </div>
    );
  };

  const renderDetailsPost = () => {
    return (
      popup === "DETAILS" && (
        <DetailsPost
          onPopup={handleDetailsPost}
          extendClass="animate__animated animate__fadeIn"
          children={renderPost()}
          author={user}
          postID={postID}
          socket={socket}
        />
      )
    );
  };

  const renderEditPostPopup = () => {
    return (
      popup === "EDIT" && (
        <EditPopup
          title="Edit post"
          onPopup={handleEditPost}
          currentUser={currentUser}
          defaultAvatar={BG_DEFAULT_WALLPAPER_USER}
          imageSrc={image}
          content={desc}
          socket={socket}
          postID={postID}
          extendClass="animate__animated animate__fadeIn"
        />
      )
    );
  };

  return (
    <>
      {renderPost()}
      {renderDetailsPost()}
      {renderEditPostPopup()}
    </>
  );
};

export default Post;
