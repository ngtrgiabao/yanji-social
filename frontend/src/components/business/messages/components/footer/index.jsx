import { memo } from "react";
import { Send, X, Image, Paperclip } from "lucide-react";
import isEqual from "react-fast-compare";

import EmojiPicker from "../../../../features/emoji-picker";

const labelEditStyle = {
  left: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "max-content",
  fontWeight: "bolder",
};

const attachFileStyle = {
  width: "2em",
  height: "2em",
  borderRadius: "0.5rem",
  padding: "0.8rem",
};

const cancelEditMsgStyle = {
  width: "2em",
  height: "2em",
  borderRadius: "0.5rem",
  padding: "0.8rem",
};

const sendMsgStyle = {
  width: "2em",
  height: "2em",
  borderRadius: "0.5rem",
  padding: "0.8rem",
};

const MessageFooter = ({
  uploadImgRef,
  activeState,
  isEdit,
  messageContent,
  onImageSelected,
  onPreviewImageBeforeUpload,
  onSendEmoji,
  onChangeInputMsg,
  onCancelEditMsg,
  onSubmit,
  onUploadImage,
  onActive,
}) => {
  const renderLabelEditMessage = () => {
    return (
      <span
        className="position-absolute bottom-100 bg-warning text-black h-100 p-3"
        style={labelEditStyle}
      >
        Chỉnh sửa tin nhắn
      </span>
    );
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="middle-container-footer px-3 d-flex justify-content-between align-items-center"
    >
      <div className="d-flex justify-content-between position-relative">
        <span
          className="icon fs-3 border-0"
          aria-label="Đính kèm tệp tin"
          role="button"
          style={attachFileStyle}
        >
          <Paperclip size={20} />
        </span>

        <span
          className="icon fs-3 mx-3 border-0"
          aria-label="Đính kèm file"
          role="button"
          style={attachFileStyle}
          onClick={() => {
            onUploadImage();
            onActive("UPLOAD_IMAGE");
          }}
        >
          <Image size={20} />
        </span>

        <input
          type="file"
          name=""
          id=""
          ref={uploadImgRef}
          hidden={true}
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            onImageSelected(e.target.files[0]);
            onPreviewImageBeforeUpload(e);
          }}
        />

        <EmojiPicker
          active={activeState}
          label="Chọn emoji"
          onActive={onActive}
          onSendEmoji={(e) => onSendEmoji(e)}
          textEmoji={"EMOJI"}
        />
      </div>

      <div className="user-input-chat position-relative mx-3" data-input>
        {isEdit && renderLabelEditMessage()}
        <input
          type="text"
          className="rounded py-2 px-3 fs-4"
          placeholder="Text your message here..."
          maxLength="3500"
          style={{
            border: "1px solid var(--color-primary)",
          }}
          value={messageContent}
          onChange={(e) => onChangeInputMsg(e)}
          autoFocus
        />
      </div>

      {isEdit ? (
        <span
          className="icon fs-3 d-flex justify-content-center border-0 align-items-center bg-danger"
          style={cancelEditMsgStyle}
          aria-label="Hủy chỉnh sửa"
          role="button"
          onClick={() => onCancelEditMsg()}
        >
          <X size={20} />
        </span>
      ) : (
        <span
          className="icon fs-3 d-flex justify-content-center border-0 align-items-center"
          style={sendMsgStyle}
          aria-label="Gửi tin nhắn"
          role="button"
          type="submit"
          onClick={onSubmit}
        >
          <Send size={20} />
        </span>
      )}
    </form>
  );
};

export default memo(MessageFooter, isEqual);
