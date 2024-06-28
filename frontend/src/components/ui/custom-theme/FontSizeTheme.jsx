import { memo } from "react";
import "./style/fontSize.css";

import { useTheme } from "../../../hooks";
import ChooseFontSizeBtn from "../../ui/button/choose-fontsize";
import { LocalStorageKeys } from "../../../constant/local-storage-key";

const FontSizeTheme = () => {
  const { setFontSizes } = useTheme();
  const fontSize = localStorage.getItem(LocalStorageKeys.FONTSIZE);

  const handleFontSizeChange = (fontSize) => {
    localStorage.setItem(LocalStorageKeys.FONTSIZE, fontSize);
    setFontSizes(fontSize);
  };

  const renderFontsizeMenu = () => {
    return (
      <div>
        <h6>Aa</h6>
        <div className="choose-size d-flex justify-content-between align-items-center">
          <ChooseFontSizeBtn
            fontSizeName="fs-1"
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
          <ChooseFontSizeBtn
            fontSizeName="fs-2"
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
          <ChooseFontSizeBtn
            fontSizeName="fs-3"
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
          <ChooseFontSizeBtn
            fontSizeName="fs-4"
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
          <ChooseFontSizeBtn
            fontSizeName="fs-5"
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
        </div>
        <h3>Aa</h3>
      </div>
    );
  };

  return (
    <div className="font-size">
      <h4>Font Size</h4>
      {renderFontsizeMenu()}
    </div>
  );
};

export default memo(FontSizeTheme);
