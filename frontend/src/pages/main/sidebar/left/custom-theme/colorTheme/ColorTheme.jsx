import React, { useState } from "react";

import "./colorTheme.css";
import { ColorData } from "../../../../../../data/ColorThemeData";

function ColorTheme() {
    const initColor = localStorage.getItem("color_theme") || "color-1";
    const [chooseColor, setChooseColor] = useState(initColor);
    const root = document.documentElement;

    switch (initColor) {
        case "color-1":
            root.style.setProperty("--primary-color-hue", "252");
            break;
        case "color-2":
            root.style.setProperty("--primary-color-hue", "52");
            break;
        case "color-3":
            root.style.setProperty("--primary-color-hue", "352");
            break;
        case "color-4":
            root.style.setProperty("--primary-color-hue", "202");
            break;
        case "color-5":
            root.style.setProperty("--primary-color-hue", "152");
            break;
    }

    const handleColor = (e) => {
        if (e.currentTarget.classList.contains("color-1")) {
            const colorClass = "color-1";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-1");
        } else if (e.currentTarget.classList.contains("color-2")) {
            const colorClass = "color-2";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-2");
        } else if (e.currentTarget.classList.contains("color-3")) {
            const colorClass = "color-3";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-3");
        } else if (e.currentTarget.classList.contains("color-4")) {
            const colorClass = "color-4";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-4");
        } else if (e.currentTarget.classList.contains("color-5")) {
            const colorClass = "color-5";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-5");
        }
    };

    const SetColor = (props) => {
        return (
            <>
                <span
                    className={
                        props.colorClass +
                        (chooseColor === props.colorClass ? " active" : "")
                    }
                    onClick={handleColor}
                ></span>
            </>
        );
    };

    return (
        <div className="color">
            <h4>Color</h4>
            <div className="choose-color d-flex justify-content-between align-items-center">
                {ColorData.map((item, index) => (
                    <SetColor key={item.id} colorClass={item.colorClass} />
                ))}
            </div>
        </div>
    );
}

export default ColorTheme;
