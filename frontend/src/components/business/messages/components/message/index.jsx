import { memo } from "react";
import isEqual from "react-fast-compare";
import { SquarePen, Trash } from "lucide-react";

import { useCurrentUser, useTimeAgo } from "../../../../../hooks";

const Message = ({
  id,
  sender,
  onUpdateMsg,
  onDeleteMsg,
  onPreviewImage,
  content,
  media,
  createdAt,
  updatedAt,
  loadingMsg,
}) => {
  const formatTime = useTimeAgo;

  const currentUser = useCurrentUser();

  return sender === currentUser._id ? (
    <div
      key={id}
      className="middle-container-body__right-text mb-3 fs-4 animate__animated animate__slideInRight d-flex align-items-end flex-column"
      data-title="current_user"
      data-id={id}
    >
      <div className="d-flex align-items-center justify-content-end w-100">
        <span
          className="action-message fs-5"
          onClick={onUpdateMsg}
          style={{
            cursor: "pointer",
            width: "2.3rem",
            height: "2.3rem",
          }}
          aria-label="Chỉnh sửa"
        >
          <SquarePen size={15} />
        </span>
        <span
          className="action-message fs-5 text-danger"
          onClick={onDeleteMsg}
          style={{
            cursor: "pointer",
            width: "2.3rem",
            height: "2.3rem",
          }}
          aria-label="Xóa"
        >
          <Trash size={15} />
        </span>
        <div className="middle-container-body__right-message-content ms-2">
          {media ? (
            <img src={media} alt="image_uploaded" onClick={onPreviewImage} />
          ) : (
            <div className="middle-container-body__right-message-content-text">
              {content}
            </div>
          )}
        </div>
      </div>
      <div className="middle-container-body__right-time">
        {formatTime(createdAt) || "now"}
        {createdAt !== updatedAt && <> - edited {formatTime(updatedAt)}</>}
      </div>
    </div>
  ) : (
    <div
      className="middle-container-body__left-text mb-3 fs-4 animate__animated animate__slideInLeft d-flex flex-column"
      data-title="friend"
      data-id={`${id}`}
      key={id}
    >
      <div className="d-flex justify-content-start align-items-center w-100">
        <span className="middle-container-body__left-message-content me-2 overflow-hidden">
          {media ? (
            <img src={media} alt="image_uploaded" onClick={onPreviewImage} />
          ) : (
            <div className="middle-container-body__left-message-content-text">
              {content}
            </div>
          )}
        </span>
      </div>
      <div className="middle-container-body__left-time">
        {formatTime(createdAt) || "now"}
      </div>
    </div>
  );
};

export default memo(Message, isEqual);
