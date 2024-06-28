import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Laugh } from "lucide-react";
import { memo } from "react";
import isEqual from "react-fast-compare";

const EmojiPicker = ({ active, textEmoji, label, onSendEmoji, onActive }) => {
  const buttonStyle = {
    width: "2em",
    height: "2em",
    borderRadius: "0.5rem",
    padding: "0.8rem",
  };

  return (
    <>
      <div
        className="position-absolute"
        style={{
          bottom: "120%",
        }}
        hidden={active !== textEmoji}
      >
        <Picker
          data={data}
          emojiSize={22}
          emojiButtonSize={29}
          maxFrequentRows={0}
          onEmojiSelect={(e) => onSendEmoji(e)}
          locale="vi"
          perLine={8}
          previewPosition="none"
        />
      </div>
      <span
        className="icon fs-3 border-0"
        aria-label={label}
        role="button"
        style={buttonStyle}
        onClick={() => {
          active !== textEmoji ? onActive("EMOJI") : onActive("");
        }}
      >
        <Laugh size={20} />
      </span>
    </>
  );
};

export default memo(EmojiPicker, isEqual);
