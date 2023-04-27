import React from "react";

import "./backgroundTheme.css";

import { useTheme } from "../../../../../../hooks/useTheme";

function BackgroundTheme() {
    const { setBgColors } = useTheme();

    const bgTheme = localStorage.getItem("background_theme");

    return (
        <div className="background">
            <div className="background">
                <h4>Background</h4>
                <div className="choose-bg d-flex justify-content-between align-items-center">
                    <div
                        className={
                            "bg-1" + (bgTheme === "bg-1" ? " active" : "")
                        }
                        onClick={() => setBgColors("bg-1")}
                    >
                        <span></span>
                        <h5 htmlFor="bg-1">Dim</h5>
                    </div>
                    <div
                        className={
                            "bg-2" + (bgTheme === "bg-2" ? " active" : "")
                        }
                        onClick={() => setBgColors("bg-2")}
                    >
                        <span></span>
                        <h5 htmlFor="bg-2">Light</h5>
                    </div>
                    <div
                        className={
                            "bg-3" + (bgTheme === "bg-3" ? " active" : "")
                        }
                        onClick={() => setBgColors("bg-3")}
                    >
                        <span></span>
                        <h5 htmlFor="bg-3">Lights Out</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackgroundTheme;
