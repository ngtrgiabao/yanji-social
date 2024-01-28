import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as likeDefault,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as liked, faRepeat } from "@fortawesome/free-solid-svg-icons";

const ActionBtn = ({
  onShare,
  onLike,
  onDetailPost,
  comments,
  likes,
  shares,
  isDisableComment,
  currentUser,
}) => {
  return (
    <div className="action-buttons d-flex justify-content-between align-items-center fs-3 border-top pt-3">
      <div className="interaction-buttons d-flex justify-content-between w-100 align-items-center gap-4">
        {/* share */}
        <span
          className="d-flex justify-content-center align-items-center share flex-fill p-1 post-action__btn rounded-2"
          onClick={onShare}
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

        {/* comment */}
        <span
          className="d-flex justify-content-center align-items-center comment flex-fill p-1 post-action__btn rounded-2"
          onClick={(e) => {
            e.stopPropagation();
            !isDisableComment && onDetailPost(e);
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

        {/* like */}
        <span
          className="d-flex justify-content-center align-items-center heart flex-fill p-1 post-action__btn rounded-2 overflow-hidden"
          onClick={onLike}
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

export default ActionBtn;
