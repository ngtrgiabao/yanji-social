import "./style/background.css";

import { useTheme } from "../../../shared/hooks";
import { ChooseBgBtn } from "../../../components";

const BackgroundTheme = () => {
  const { setBgColors } = useTheme();
  const bgTheme = localStorage.getItem("background_theme");

  const handleBackgroundChange = (bg) => {
    localStorage.setItem("background_theme", bg);
    setBgColors(bg);
  };

  const renderBgMenu = () => {
    return (
      <div className="choose-bg d-flex justify-content-between align-items-center">
        <ChooseBgBtn
          bgName="bg-1"
          bgTheme={bgTheme}
          content="Dim"
          onBackgroundChange={handleBackgroundChange}
        />
        <ChooseBgBtn
          bgName="bg-2"
          bgTheme={bgTheme}
          content="Light"
          onBackgroundChange={handleBackgroundChange}
        />
        <ChooseBgBtn
          bgName="bg-3"
          bgTheme={bgTheme}
          content="Lights Out"
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    );
  };

  return (
    <div className="background">
      <div className="background">
        <h4>Background</h4>
        {renderBgMenu()}
      </div>
    </div>
  );
};

export default BackgroundTheme;
