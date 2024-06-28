import { lazy, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkCheck,
  MoreVertical,
  Trash,
  Pencil,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import isEqual from "react-fast-compare";

import { BG_DEFAULT_WALLPAPER_USER } from "../../../assets";

import "./style/post.css";

import {
  deletePost,
  likePost,
  sharePost,
} from "../../../redux/request/postRequest";
import { getUserByID, updateUser } from "../../../redux/request/userRequest";
import { useTimeAgo, useCopyUrl, useCurrentUser } from "../../../hooks";
import ParagraphWithLink from "../../features/paragraph-with-link";
import EditPopup from "../../ui/popup/edit";
import { Photo } from "../media";
import { pushNewNotification } from "../../../redux/request/notificationRequest";
import { NotiType } from "../../../constant/notification";
import Avatar from "../avatar/Avatar";
import Global from "../../../constant/global";
import ActionBtn from "./ActionBtn";
import ConfirmDialog from "../dialog/confirm-dialog";
const DetailsPost = lazy(() => import("./DetailsPost"));

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
  isDisableComment = false,
}) => {
  const [popup, setPopup] = useState("");
  const [user, setUser] = useState({
    _id: "",
    username: "",
    profilePicture: "",
    isVerify: false,
  });
  // const [postShared, setPostShared] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const formatTime = useTimeAgo;
  const currentUser = useCurrentUser();

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

  const handleLikePost = () => {
    likePost(post, dispatch)
      .then(async (data) => {
        socket = io(Global.SOCKET_URL);

        await socket.emit("update-post", data.data);

        const { isLiked } = data;

        if (isLiked && user?._id !== currentUser?._id) {
          const notification = {
            sender: currentUser?._id,
            receiver: user?._id,
            type: NotiType.LIKE_POST,
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
  };

  const handleSharePost = () => {
    sharePost(post, dispatch)
      .then(async (data) => {
        socket = io(Global.SOCKET_URL);
        await socket.emit("update-post", data.data);

        const { isShared } = data;

        if (isShared && user?._id !== currentUser?._id) {
          const notification = {
            sender: currentUser?._id,
            receiver: user?._id,
            type: NotiType.SHARE_POST,
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
  };

  const handleSavePost = (postID) => {
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
  };

  const handleDeletePost = (postID) => {
    deletePost(postID, dispatch)
      .then(async (data) => {
        socket = io(Global.SOCKET_URL);
        await socket.emit("delete-post", data?.data);
        toast.success("Post deleted", {
          className: "fs-3",
        });
      })
      .catch((error) => {
        console.error("Failed to delete post", error);
        toast.error("Something went wrong. Please try again", {
          className: "fs-3",
        });
      });
  };

  const handlePost = {
    likePost: handleLikePost,
    sharePost: handleSharePost,
    savePost: (postID) => handleSavePost(postID),
    deletePost: (postID) => handleDeletePost(postID),
  };

  const renderEditPost = () => {
    return (
      <div className="edit-post" hidden={popup !== "SETTING"}>
        <ul>
          {currentUser?._id === user?._id && (
            <>
              <li
                className="delete-post"
                onClick={() => setActive("DELETE_POST")}
                title="Delete post"
              >
                <span>
                  <Trash size={20} />
                </span>
                Delete this post
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditPost();
                }}
                title="Edit post"
              >
                <span>
                  <Pencil size={20} />
                </span>
                Edit this post
              </li>
            </>
          )}
          <li
            onClick={(e) => {
              e.stopPropagation();
              useCopyUrl(Global.DEPLOY_URL + "post/" + postID);
            }}
            style={{
              borderRadius:
                currentUser?._id === userID ? "" : "var(--card-border-radius)",
            }}
            title="Copy url"
          >
            <span>
              <ClipboardList size={20} />
            </span>
            Copy url
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
            className="profile-pic bg-black text-white fs-5"
            aria-label="Avatar user"
          >
            <Avatar
              imageSrc={user.profilePicture}
              label={user.username}
              userId={user?._id}
            />
          </Link>
          <Link to={`/user/${user?._id}`} className="info">
            <div className="d-flex align-items-center fs-5">
              <div className="fw-bold d-flex align-items-center">
                {user.username || "loading..."}
                {user.isVerify && (
                  <CheckCircle2 size={14} className="ms-2 text-primary" />
                )}
              </div>
              <div className="ms-2 fw-light">
                {formatTime(createdAt) || "now"}
              </div>
            </div>
            <span>
              <>@{user?.username || "loading..."}</>
            </span>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <span title="Save post">
            {isSaved ? (
              <BookmarkCheck
                size={20}
                cursor="pointer"
                className="me-3"
                color="#1877f2"
                onClick={() => handlePost["savePost"](postID)}
              />
            ) : (
              <Bookmark
                size={20}
                cursor="pointer"
                className="me-3"
                onClick={() => handlePost["savePost"](postID)}
              />
            )}
          </span>
          <span className="post-settings" title="Setting post">
            <MoreVertical
              size={20}
              cursor="pointer"
              onClick={(e) => {
                handleSetting(e);
              }}
            />
            {renderEditPost()}
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
          onConfirm={() => handlePost["deletePost"](postID)}
          confirmButtonText="Delete"
        />
      )
    );
  };

  const renderPost = () => {
    return (
      <div key={postID} className="post mb-4 position-relative">
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
          <Photo postID={postID} imageSrc={image} label="Media of post" />
        )}
        {video && <Photo videoSrc={video} isVideo={true} />}
        <ActionBtn
          key={postID}
          currentUser={currentUser}
          onShare={() => handlePost["sharePost"]()}
          onLike={() => handlePost["likePost"]()}
          onDetailPost={(e) => handleDetailsPost(e)}
          comments={comments}
          likes={likes}
          shares={shares}
          isDisableComment={isDisableComment}
        />

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

export default memo(Post, isEqual);
