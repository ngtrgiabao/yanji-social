import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";

import "../styles/personalBody.css";

import PersonalIntroduce from "./PersonalIntroduce";
import PersonalSocialLinks from "./PersonalSocialLinks";
import { PostPopup, Post } from "../../../components";
import {
  getAllPostsByUser,
  getPostByID,
} from "../../../redux/request/postRequest";
import { io } from "socket.io-client";
import {
  getPostsShared,
  getUserByID,
} from "../../../redux/request/userRequest";
import SocketEvent from "../../../constants/socket-event";
import Global from "../../../constants/global";
import { useCurrentUser } from "../../../hooks";
import { Avatar } from "../../../components";

//TODO FIX POST SHARED ALWAYS PIN

const PersonalBody = ({
  userInfo,
  socket,
  onUpdateBioPopup,
  onUpdateIntroducePopup,
}) => {
  const [popup, setPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const currentUser = useCurrentUser();

  const handlePopup = () => {
    setPopup((popup) => !popup);
  };

  const renderPostPopup = () => {
    return (
      popup && (
        <PostPopup
          socket={socket}
          onPopup={handlePopup}
          extendClass="animate__animated animate__fadeIn"
        />
      )
    );
  };

  const handleSocket = {
    updatePost: useCallback(
      (data) => {
        const { _id } = data;
        getPostByID(_id, dispatch).then((data) => {
          setPosts((prevPosts) => {
            const updatePost = prevPosts.map((p) =>
              p?._id === data?.data._id ? data.data : p,
            );

            return updatePost;
          });
        });
      },
      [dispatch],
    ),
    uploadPost: useCallback((data) => {
      setPosts((prevPosts) => [data, ...prevPosts]);
    }, []),
    deletePost: useCallback((data) => {
      const { _id } = data;
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((p) => p?._id !== _id);
        return updatedPosts;
      });
    }, []),
  };

  useEffect(() => {
    socketRef.current = io(Global.SOCKET_URL);
    const socket = socketRef.current;

    socket.on(SocketEvent["UPDATED_POST"], handleSocket.updatePost);
    socket.on(SocketEvent["UPLOADED_POST"], handleSocket.uploadPost);
    socket.on(SocketEvent["DELETED_POST"], handleSocket.deletePost);

    return () => {
      socket.off(SocketEvent["UPDATED_POST"], handleSocket.updatePost);
      socket.off(SocketEvent["UPLOADED_POST"], handleSocket.uploadPost);
      socket.off(SocketEvent["DELETED_POST"], handleSocket.deletePost);
    };
  }, [
    handleSocket.updatePost,
    handleSocket.uploadPost,
    handleSocket.deletePost,
    Global.SOCKET_URL,
  ]);

  const handleUser = useMemo(
    () => ({
      getAllPosts: (userID) => {
        getAllPostsByUser(userID, dispatch)
          .then((data) => {
            setPosts(data.posts);
          })
          .catch((err) => {
            console.error("Failed to get post of user", err);
          });
      },
      getPostsShared: (userID) => {
        getPostsShared(userID, dispatch)
          .then((data) => {
            const { postShared } = data;
            postShared?.map((p) =>
              getPostByID(p.postID, dispatch).then((data) => {
                setPosts((prevPosts) => [data?.data, ...prevPosts]);
              }),
            );
          })
          .catch((err) => {
            console.error("Failed to get post shared", err);
          });
      },
    }),
    [dispatch],
  );

  useEffect(() => {
    if (userInfo._id) {
      handleUser.getAllPosts(userInfo._id);

      getUserByID(userInfo._id, dispatch).then((data) => {
        const { postShared } = data.user;

        if (postShared.length > 0) {
          handleUser.getPostsShared(userInfo._id);
        }
      });
    }
  }, [userInfo._id, handleUser, dispatch]);

  return (
    <>
      <div className="row place-items-center gap-3">
        <div className="col">
          <div className="row p-3">
            <PersonalIntroduce
              socket={socket}
              onUpdateBioPopup={onUpdateBioPopup}
              onUpdateIntroducePopup={onUpdateIntroducePopup}
              userInfo={userInfo}
            />
          </div>
          <div className="row">
            <PersonalSocialLinks />
          </div>
        </div>
        <div className="col-7" data-posts>
          {currentUser?._id === userInfo?._id && (
            <div className="row d-flex border-bottom pb-4 mb-4" data-uploadpost>
              <div className="profile-pic p-0 rounded-circle overflow-hidden text-white">
                {/* {userInfo.profilePicture ? (
                  <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={userInfo.profilePicture}
                    alt="Avatar user"
                    className="w-100"
                  />
                ) : (
                  <>{userInfo.username}</>
                )} */}
                <Avatar
                  imageSrc={userInfo.profilePicture}
                  label={userInfo.username}
                />
              </div>
              <button
                className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted text-center"
                onClick={handlePopup}
              >
                What are you thinking, {userInfo.username || "user"} ?
              </button>
            </div>
          )}

          <div className="posts" data-posts>
            {posts.map(
              (post) =>
                post && (
                  <Post
                    key={post._id}
                    postID={post._id}
                    image={post.img}
                    video={post.video}
                    userID={post.userID}
                    createdAt={post.createdAt}
                    desc={post.desc}
                    likes={post.likes}
                    shares={post.shares}
                    comments={post.comments}
                  />
                ),
            )}
          </div>
        </div>
      </div>

      {renderPostPopup()}
    </>
  );
};

export default PersonalBody;
