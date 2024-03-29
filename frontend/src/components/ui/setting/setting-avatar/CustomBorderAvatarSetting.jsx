import { useState } from 'react';
import '../setting-avatar/style/style.css';
const CustomBorderAvatarSetting = ({ close }) => {
  const [borderColor, setBorderColor] = useState('#000000');

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
    <div className="custom-border-avatar-setting-container">
      <div className="custom-border-avatar-form">
        <h2>Customize Border Avatar</h2>
        <div className="color-picker-container">
          <label htmlFor="border-color-picker">Choose Border Color:</label>
          <div className="color-buttons">
            <button
              className="color-button black"
              onClick={() => handleColorChange('#000000')}
            ></button>
            <button
              className="color-button red"
              onClick={() => handleColorChange('#FF0000')}
            ></button>
            <button
              className="color-button green"
              onClick={() => handleColorChange('#00FF00')}
            ></button>
            <button
              className="color-button blue"
              onClick={() => handleColorChange('#0000FF')}
            ></button>
            <button
              className="color-button yellow"
              onClick={() => handleColorChange('#FFFF00')}
            ></button>
          </div>
        </div>
        <div className="button-group">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CustomBorderAvatarSetting;