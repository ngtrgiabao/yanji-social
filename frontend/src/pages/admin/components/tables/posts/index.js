import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Pagination, Fade } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  StepForward,
  StepBack,
  ExternalLink,
  CircleSlash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Global from "../../../../../constant/global";
import DeleteModal from "./delete";
import LoadingPage from "../../../../../components/common/loading/loading-page";
import { deletePost } from "../../../../../redux/request/postRequest";
import { ToastProvider } from "../../../../../context/toast";

import "../../../../../components/ui/post/style/post.css";
import { useTimeAgo } from "../../../../../hooks";

const PostsTable = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const formatTime = useTimeAgo;

  const navigate = useNavigate();

  async function fetchPosts() {
    const url = `${Global.SOCKET_URL}/api/v1/post/all-posts?limit=14&skip=${
      page * 14
    }`;

    const res = await axios.get(url);
    const postsList = res?.data.posts;

    if (postsList.length > 0) {
      setPosts(postsList);
      setIsEmpty(false);
    } else {
      setPosts([]);
      setIsEmpty(true);
    }
  }

  function onDelete(postId) {
    setOpen(true);
    setPostId(postId);
  }

  function onDeleteSubmit(postId) {
    deletePost(postId, dispatch)
      .then((res) => {
        toast.success("Deleted successfully");
        fetchPosts();
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log("Internal Error", error);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="px-3 mt-5">
      {posts.length > 0 ? (
        <>
          <Table
            bordered
            size="md"
            style={{
              color: "var(--text-color)",
            }}
          >
            <thead>
              <tr className="fs-4">
                <th>Author</th>
                <th>Content</th>
                <th>Image</th>
                <th>Video</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Shares</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr
                  key={post._id}
                  className="fs-5"
                  style={{
                    background: `${
                      idx % 2 === 0 ? "" : "var(--color-bg-hover)"
                    }`,
                  }}
                >
                  <td className="text-truncate" style={{ maxWidth: 150 }}>
                    <Link
                      to={`/user/${post.userID}`}
                      className="text-primary d-flex align-items-center"
                    >
                      View author <ExternalLink size={10} className="ms-2" />
                    </Link>
                  </td>
                  <td
                    className={`text-truncate ${!post.desc && "text-muted"}`}
                    style={{
                      maxWidth: 150,
                      cursor: `${!post.desc && "not-allowed"}`,
                    }}
                  >
                    {post.desc || (
                      <span
                        className="text-muted d-flex align-items-center"
                        style={{ cursor: "not-allowed" }}
                      >
                        <CircleSlash2 size={10} className="me-2" /> No content
                      </span>
                    )}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: 150 }}>
                    {post.img ? (
                      <a
                        href={`${post.img}`}
                        className="text-primary d-flex align-items-center"
                      >
                        View image <ExternalLink size={10} className="ms-2" />
                      </a>
                    ) : (
                      <span
                        className="text-muted d-flex align-items-center"
                        style={{ cursor: "not-allowed" }}
                      >
                        <CircleSlash2 size={10} className="me-2" /> No image
                      </span>
                    )}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: 150 }}>
                    {post.video ? (
                      <a
                        href={`${post.video}`}
                        className="text-primary d-flex align-items-center"
                      >
                        View video <ExternalLink size={10} className="ms-2" />
                      </a>
                    ) : (
                      <span
                        className="text-muted d-flex align-items-center"
                        style={{ cursor: "not-allowed" }}
                      >
                        <CircleSlash2 size={10} className="me-2" /> No video
                      </span>
                    )}
                  </td>
                  <td>{post.likes.length}</td>
                  <td>{post.comments.length}</td>
                  <td>{post.shares.length}</td>
                  <td className="text-truncate" style={{ maxWidth: 150 }}>
                    {formatTime(post.createdAt)}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: 150 }}>
                    {formatTime(post.updatedAt)}
                  </td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        navigate(`/post/${post._id}`);
                      }}
                      className="rounded rounded-2 me-3 d-flex align-items-center"
                    >
                      Details
                    </Button>
                    <Button
                      className="rounded rounded-2"
                      variant="danger"
                      onClick={() => onDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}

              <Pagination size="lg" className="mt-3">
                <Pagination.Item
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  disabled={page === 0}
                >
                  <StepBack size={15} />
                </Pagination.Item>
                <Pagination.Item
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={isEmpty || posts.length < 14}
                >
                  <StepForward size={15} />
                </Pagination.Item>
              </Pagination>
            </tbody>

            {postId && (
              <Fade in={open}>
                <DeleteModal
                  show={open}
                  onHide={() => setOpen(false)}
                  postId={postId}
                  onDeleteSubmit={onDeleteSubmit}
                  className="text-black"
                />
              </Fade>
            )}
          </Table>
        </>
      ) : isEmpty ? (
        <div>No posts found</div>
      ) : (
        <LoadingPage />
      )}

      <ToastProvider />
    </div>
  );
};

export default PostsTable;
