import "../../../../../../style/pages/home/sidebar/left/custom-theme/color-theme/colorTheme.css";

import { useTheme } from "../../../../../../hooks/useTheme";

function ColorTheme() {
    const textColorTheme = localStorage.getItem("text_color");
    const { setTextColors } = useTheme();

    const renderColorThemeMenu = () => {
        return (
            <div className="choose-color d-flex justify-content-between align-items-center">
                <span
                    className={
                        "color-1" +
                        (textColorTheme === "color-1" ? " active" : "")
                    }
                    onClick={() => setTextColors("color-1")}
                ></span>
                <span
                    className={
                        "color-2" +
                        (textColorTheme === "color-2" ? " active" : "")
                    }
                    onClick={() => setTextColors("color-2")}
                ></span>
                <span
                    className={
                        "color-3" +
                        (textColorTheme === "color-3" ? " active" : "")
                    }
                    onClick={() => setTextColors("color-3")}
                ></span>
                <span
                    className={
                        "color-4" +
                        (textColorTheme === "color-4" ? " active" : "")
                    }
                    onClick={() => setTextColors("color-4")}
                ></span>
                <span
                    className={
                        "color-5" +
                        (textColorTheme === "color-5" ? " active" : "")
                    }
                    onClick={() => setTextColors("color-5")}
                ></span>
            </div>
        );
    };

    return (
        <div className="color">
            <h4>Color</h4>
            {renderColorThemeMenu()}
        </div>
    );
}

export default ColorTheme;
