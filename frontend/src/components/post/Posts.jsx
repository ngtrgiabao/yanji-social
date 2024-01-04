import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import "../style/post.css";

import { getPostByID } from "../../redux/request/postRequest";
import Post from "./Post";
import axios from "axios";

const Posts = ({ socket, handleDeletePopup = () => {} }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const loadingRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });

  const handleSocket = {
    updatePost: useCallback(
      (data) => {
        const { _id } = data;

        getPostByID(_id, dispatch).then((data) => {
          const originalPost = data.data;
          setPosts((prevPosts) => {
            const updatePost = prevPosts.map((p) =>
              p._id === originalPost._id ? originalPost : p,
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
        const updatedPosts = prevPosts.filter((p) => p._id !== _id);
        return updatedPosts;
      });
    }, []),
  };

  useEffect(() => {
    socket = io(SOCKET_URL);

    socket.on("updated-post", handleSocket.updatePost);
    socket.on("uploaded-post", handleSocket.uploadPost);
    socket.on("deleted-post", handleSocket.deletePost);

    return () => {
      socket.off("updated-post", handleSocket.updatePost);
      socket.off("uploaded-post", handleSocket.uploadPost);
      socket.off("deleted-post", handleSocket.deletePost);
    };
  }, [
    handleSocket.updatePost,
    handleSocket.uploadPost,
    handleSocket.deletePost,
    socket,
  ]);

  const fetchMorePosts = useCallback(async () => {
    const res = await axios.get(
      process.env.REACT_APP_SOCKET_URL +
        `/api/v1/post/all-posts?limit=5&skip=${page * 5}`,
    );
    const { posts } = res.data;

    if (posts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prevPost) => [...prevPost, ...posts]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [page]);

  const onIntersection = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        fetchMorePosts();
      }
    },
    [fetchMorePosts, hasMore],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [posts, onIntersection]);

  return (
    <div className="posts">
      {currentUser &&
        posts.map((post) => (
          <Post
            key={post._id}
            postID={post._id}
            image={post.img}
            video={post.video}
            userID={post.userID}
            desc={post.desc}
            likes={post.likes}
            shares={post.shares}
            comments={post.comments}
            socket={socket}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            handleDeletePopup={handleDeletePopup}
          />
        ))}

      {currentUser && hasMore && (
        <div
          className="d-flex justify-content-center fs-3 fw-bold my-3"
          ref={loadingRef}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default Posts;
