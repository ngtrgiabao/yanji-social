import { memo } from "react";
import Comments from "../comment/Comments";
import isEqual from "react-fast-compare";

const DetailsPost = ({
  onPopup = () => {},
  extendClass,
  children,
  author,
  postID,
  socket,
}) => {
  return (
    <div
      onClick={(e) => onPopup(e)}
      className={
        "d-flex justify-content-center align-items-center post-popup__container text-white " +
        extendClass
      }
    >
      <div
        className="d-flex align-items-center flex-column h-75 w-50 py-3 px-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderRadius: "1rem",
          background: "var(--color-primary-light)",
          color: "var(--color-dark)",
        }}
        data-detail-post
      >
        <p className="fs-3 fw-bold mb-1 text-white">
          Bài viết từ {author.username}
        </p>
        <div
          className="p-2 w-100 h-100"
          style={{
            overflowY: "scroll",
            borderRadius: "1rem",
          }}
        >
          {children}
          <Comments postID={postID} author={author} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsPost, isEqual);
