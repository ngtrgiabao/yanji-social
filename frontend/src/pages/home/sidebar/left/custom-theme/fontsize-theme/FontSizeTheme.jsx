import "../../../../../../style/pages/home/sidebar/left/custom-theme/fontsize-theme/fontSizeTheme.css";

import { useTheme } from "../../../../../../hooks/useTheme";

function FontSizeTheme() {
    const { setFontSizes } = useTheme();
    const fontSize = localStorage.getItem("font_size");

    const handleFontSizeChange = (fontSize) => {
        localStorage.setItem("font_size", fontSize);
        setFontSizes(fontSize);
    };

    const renderFontsizeMenu = () => {
        return (
            <div>
                <h6>Aa</h6>
                <div className="choose-size d-flex justify-content-between align-items-center">
                    <span
                        className={
                            "font-size-1" +
                            (fontSize === "font-size-1" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("font-size-1")}
                    ></span>
                    <span
                        className={
                            "font-size-2" +
                            (fontSize === "font-size-2" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("font-size-2")}
                    ></span>
                    <span
                        className={
                            "font-size-3" +
                            (fontSize === "font-size-3" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("font-size-3")}
                    ></span>
                    <span
                        className={
                            "font-size-4" +
                            (fontSize === "font-size-4" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("font-size-4")}
                    ></span>
                    <span
                        className={
                            "font-size-5" +
                            (fontSize === "font-size-5" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("font-size-5")}
                    ></span>
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
}

export default FontSizeTheme;
