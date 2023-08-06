import "../../../style/pages/home/customTheme/fontSize.css";

import { useTheme } from "../../../hooks/useTheme";

const FontSizeTheme = () => {
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
                            "fs-1" + (fontSize === "fs-1" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("fs-1")}
                    ></span>
                    <span
                        className={
                            "fs-2" + (fontSize === "fs-2" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("fs-2")}
                    ></span>
                    <span
                        className={
                            "fs-3" + (fontSize === "fs-3" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("fs-3")}
                    ></span>
                    <span
                        className={
                            "fs-4" + (fontSize === "fs-4" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("fs-4")}
                    ></span>
                    <span
                        className={
                            "fs-5" + (fontSize === "fs-5" ? " active" : "")
                        }
                        onClick={() => handleFontSizeChange("fs-5")}
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
};

export default FontSizeTheme;
