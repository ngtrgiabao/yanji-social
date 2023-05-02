import React from "react";

import "../../../../../../style/pages/home/sidebar/left/custom-theme/fontsize-theme/fontSizeTheme.css";

import { useTheme } from "../../../../../../hooks/useTheme";

function FontSizeTheme() {
    const fontSize = localStorage.getItem("font_size");
    const { setFontSizes } = useTheme();

    return (
        <div className="font-size">
            <h4>Font Size</h4>
            <div>
                <h6>Aa</h6>
                <div className="choose-size d-flex justify-content-between align-items-center">
                    <span
                        className={
                            "font-size-1" +
                            (fontSize === "font-size-1" ? " active" : "")
                        }
                        onClick={() => setFontSizes("font-size-1")}
                    ></span>
                    <span
                        className={
                            "font-size-2" +
                            (fontSize === "font-size-2" ? " active" : "")
                        }
                        onClick={() => setFontSizes("font-size-2")}
                    ></span>
                    <span
                        className={
                            "font-size-3" +
                            (fontSize === "font-size-3" ? " active" : "")
                        }
                        onClick={() => setFontSizes("font-size-3")}
                    ></span>
                    <span
                        className={
                            "font-size-4" +
                            (fontSize === "font-size-4" ? " active" : "")
                        }
                        onClick={() => setFontSizes("font-size-4")}
                    ></span>
                    <span
                        className={
                            "font-size-5" +
                            (fontSize === "font-size-5" ? " active" : "")
                        }
                        onClick={() => setFontSizes("font-size-5")}
                    ></span>
                </div>
                <h3>Aa</h3>
            </div>
        </div>
    );
}

export default FontSizeTheme;
