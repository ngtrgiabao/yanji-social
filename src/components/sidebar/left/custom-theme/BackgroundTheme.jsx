import React from "react";
import { useState } from "react";
import { BackgroundThemeData } from "../../../data/BackgroundThemeData";

function BackgroundTheme() {
    const initBackground = localStorage.getItem("background_theme") || "bg-1";
    const [chooseBackground, setChooseBackground] = useState("");
    const root = document.documentElement;

    switch (initBackground) {
        case "bg-1":
            root.style.setProperty("--dark-color-lightness", "17%");
            root.style.setProperty("--light-color-lightness", "95%");
            root.style.setProperty("--white-color-lightness", "100%");
            break;

        case "bg-2":
            root.style.setProperty("--dark-color-lightness", "95%");
            root.style.setProperty("--light-color-lightness", "20%");
            root.style.setProperty("--white-color-lightness", "15%");
            break;

        case "bg-3":
            root.style.setProperty("--dark-color-lightness", "95%");
            root.style.setProperty("--light-color-lightness", "10%");
            root.style.setProperty("--white-color-lightness", "0%");
            break;
    }

    const handleBackground = (e) => {
        if (e.currentTarget.classList.contains("bg-1")) {
            const backgroundClass = "bg-1";
            localStorage.setItem("background_theme", backgroundClass);

            setChooseBackground("bg-1");
        } else if (e.currentTarget.classList.contains("bg-2")) {
            const backgroundClass = "bg-2";
            localStorage.setItem("background_theme", backgroundClass);

            setChooseBackground("bg-2");
        } else if (e.currentTarget.classList.contains("bg-3")) {
            const backgroundClass = "bg-2";
            localStorage.setItem("background_theme", backgroundClass);

            setChooseBackground("bg-3");
        }
    };

    const SetBackground = (props) => {
        return (
            <>
                <div
                    className={
                        props.backgroundClass +
                        (chooseBackground === props.backgroundClass
                            ? " active"
                            : "")
                    }
                    onClick={handleBackground}
                >
                    <span></span>
                    <h5 htmlFor={props.backgroundClass}>{props.name}</h5>
                </div>
            </>
        );
    };

    return (
        <div className="background">
            <div className="background">
                <h4>Background</h4>
                <div className="choose-bg d-flex justify-content-between align-items-center">
                    {BackgroundThemeData.map((item, index) => (
                        <SetBackground
                            key={item.id}
                            backgroundClass={item.backgroundClass}
                            name={item.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BackgroundTheme;
