import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import isEqual from "react-fast-compare";

import "../setting-avatar/style/style.css";
import { getUserByID, updateUser } from "../../../../redux/request/userRequest";
import {
  useCurrentUser,
  getValueColorVariable,
  getColorCode,
} from "../../../../hooks";
import { colorButton } from "./data";

const saveBtnStye = {
  cursor: "pointer",
  background: "var(--color-primary)",
};

const CustomBorderAvatarSetting = ({ close }) => {
  const [borderColor, setBorderColor] = useState("");
  const [choosedColor, setChoosedColor] = useState("");

  const currentUser = useCurrentUser();
  const colorBtn = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserByID(currentUser._id, dispatch).then((res) => {
      res?.user.borderAvatar && setBorderColor(res.user.borderAvatar);
    });
  }, [currentUser]);

  const handleColorChange = (color) => {
    const variableName = getValueColorVariable(color);
    setBorderColor(variableName);
  };

  const handleUpdateUser = (userID, borderAvatar) => {
    const updatedUser = {
      userID,
      borderAvatar,
    };

    updateUser(updatedUser, dispatch)
      .then(() => {
        toast.success("Success");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error("Something went wrong", err);
      });
  };

  const handleSave = () => {
    const colorValue = getColorCode(borderColor, colorBtn.current);
    handleUpdateUser(currentUser._id, colorValue);
  };

  const renderColorMenu = () => {
    return Object.keys(colorButton).map((color) => (
      <div
        type="button"
        title={color}
        key={color}
        ref={colorBtn}
        className={`d-flex justify-content-center align-items-center color-button rounded-circle ${choosedColor === colorButton[color] && "border border-3 border-light"}`}
        style={colorButton[color]}
        onClick={() => {
          handleColorChange(colorButton[color].backgroundColor);
          setChoosedColor(colorButton[color]);
        }}
      ></div>
    ));
  };

  return (
    <div
      className="card animate__animated animate__fadeIn"
      style={{
        width: "max-content",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="custom-border-avatar-form d-flex flex-column align-items-center">
        <div className="fs-2">Choose your avatar style</div>

        <div className="d-flex my-5 gap-3">{renderColorMenu()}</div>

        <div className="d-flex justify-content-end gap-3 w-100">
          <span
            className="py-1 px-4 rounded-3"
            onClick={close}
            style={{
              cursor: "pointer",
            }}
          >
            Close
          </span>

          <span
            className="py-1 px-4 rounded-3 text-white"
            style={saveBtnStye}
            onClick={handleSave}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomBorderAvatarSetting, isEqual);
