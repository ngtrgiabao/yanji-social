import React, { useState } from "react";

import "./fontSizeTheme.css";
import { FontsizeData } from "../../../../../../data/FontSizeThemeData";

function FontSizeTheme() {
    const initFontsize = localStorage.getItem("fontsize") || "font-size-1";
    const [chooseFontSize, setChooseFontSize] = useState("");
    const root = document.documentElement;

    let fontSize = "";

    switch (initFontsize) {
        case "font-size-1":
            fontSize = "10px";
            root.style.setProperty("--sticky-top-left", "8rem");
            root.style.setProperty("--sticky-top-right", "8rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-2":
            fontSize = "11.5px";
            root.style.setProperty("--sticky-top-left", "8.4rem");
            root.style.setProperty("--sticky-top-right", "8.4rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-3":
            fontSize = "16px";
            root.style.setProperty("--sticky-top-left", "8rem");
            root.style.setProperty("--sticky-top-right", "8rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-4":
            fontSize = "19px";
            root.style.setProperty("--sticky-top-left", "8rem");
            root.style.setProperty("--sticky-top-right", "8rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-5":
            fontSize = "22px";
            root.style.setProperty("--sticky-top-left", "8rem");
            root.style.setProperty("--sticky-top-right", "8rem");
            root.style.fontSize = fontSize;
            break;
    }

    const handleFontSize = (e) => {
        if (e.currentTarget.classList.contains("font-size-1")) {
            const FontSizeClass = "font-size-1";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-1");
        } else if (e.currentTarget.classList.contains("font-size-2")) {
            const FontSizeClass = "font-size-2";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-2");
        } else if (e.currentTarget.classList.contains("font-size-3")) {
            const FontSizeClass = "font-size-3";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-3");
        } else if (e.currentTarget.classList.contains("font-size-4")) {
            const FontSizeClass = "font-size-4";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-4");
        } else if (e.currentTarget.classList.contains("font-size-5")) {
            const FontSizeClass = "font-size-5";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-5");
        }

        root.style.fontSize = fontSize;
    };

    const SetFontsize = (props) => {
        return (
            <>
                <span
                    className={
                        props.fontSizeClass +
                        (chooseFontSize === props.fontSizeClass
                            ? " active"
                            : "")
                    }
                    onClick={handleFontSize}
                ></span>
            </>
        );
    };

    return (
        <div className="font-size">
            <h4>Font Size</h4>
            <div>
                <h6>Aa</h6>
                <div className="choose-size d-flex justify-content-between align-items-center">
                    {FontsizeData.map((item, index) => (
                        <SetFontsize
                            key={item.id}
                            fontSizeClass={item.fontSizeClass}
                        />
                    ))}
                </div>
                <h3>Aa</h3>
            </div>
        </div>
    );
}

export default FontSizeTheme;
