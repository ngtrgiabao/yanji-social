import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "@emoji-mart/data";

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
        <FontAwesomeIcon icon={faFaceLaughBeam} />
      </span>
    </>
  );
};

export default EmojiPicker;
