import { useState } from "react";
import "../setting-avatar/style/style.css";

const colorButton = {
  red: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "var(--color-danger)",
    color: "white",
  },
  purple: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "var(--color-primary)",
    color: "white",
  },
  green: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "var(--color-success)",
    color: "white",
  },
  blue: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "var(--color-blue)",
    color: "white",
  },
  yellow: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "var(--color-warn)",
    color: "white",
  }
}

const saveBtnStye = {
  cursor: "pointer",
  background: "var(--color-primary)",
}

const primaryButtonStyle = (color) => {
  console.log(color)
  return {
    backgroundColor: `${color === "primary" ? "var(--color-primary)" : `${color}`}`
  }
}

const CustomBorderAvatarSetting = ({ close }) => {
  const [borderColor, setBorderColor] = useState("#000000");

  const handleColorChange = (color) => {
    setBorderColor(color);
  };

  const handleSave = () => {
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <div
      className="card animate__animated animate__fadeIn"
      style={{
        width: "max-content",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <div className="custom-border-avatar-form d-flex flex-column align-items-center">
        <div className="color-picker-container">
          <div className="fs-2">Choose the color you like:</div>
          <div className="d-grid my-5">
            <div className="d-flex gap-3">
              {
                Object.keys(colorButton).map((color) => (
                  <div
                    type="button"
                    title={color}
                    key={color}
                    className={`d-flex justify-content-center align-items-center color-button rounded-circle`}
                    style={colorButton[color]}
                    onClick={() => handleColorChange(color)}
                  >
                    :D
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3 w-100">
          <span className="py-1 px-4 rounded-3" style={{
            cursor: "pointer",
          }}>
            Close
          </span>
          <span
            className="py-1 px-4 rounded-3"
            style={saveBtnStye}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomBorderAvatarSetting;
