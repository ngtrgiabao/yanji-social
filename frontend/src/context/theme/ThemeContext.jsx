import { createContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
    setBgColors: () => {},
    setTextColors: () => {},
    setFontSizes: () => {},
});

const ThemeProvider = ({ children }) => {
    const [bg, setBg] = useState("");
    const [textColor, setTextColor] = useState("");
    const [fontSize, setFontSize] = useState("");

    const root = document.documentElement;

    useEffect(() => {
        // Retrieve the saved theme from local storage
        const savedBgTheme = localStorage.getItem("background_theme");
        const saveTextColor = localStorage.getItem("text_color");
        const saveFontSize = localStorage.getItem("font_size");

        if (savedBgTheme) {
            setBg(savedBgTheme);
        }

        if (saveTextColor) {
            setTextColor(saveTextColor);
        }

        if (saveFontSize) {
            setFontSize(saveFontSize);
        }
    }, []);

    // Set Background theme
    useEffect(() => {
        switch (bg) {
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

        // Save the current theme to local storage
        localStorage.setItem("background_theme", bg);
    }, [bg]);

    // Set Text color
    useEffect(() => {
        switch (textColor) {
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

        // Save the current theme to local storage
        localStorage.setItem("text_color", textColor);
    }, [textColor]);

    // Set Font size
    useEffect(() => {
        switch (fontSize) {
            case "font-size-1":
                root.style.setProperty("--sticky-top-left", "8rem");
                root.style.setProperty("--sticky-top-right", "8rem");
                root.style.fontSize = "10px";

                break;

            case "font-size-2":
                root.style.setProperty("--sticky-top-left", "8.4rem");
                root.style.setProperty("--sticky-top-right", "8.4rem");
                root.style.fontSize = "11.5px";

                break;

            case "font-size-3":
                root.style.setProperty("--sticky-top-left", "8rem");
                root.style.setProperty("--sticky-top-right", "8rem");
                root.style.fontSize = "16px";

                break;

            case "font-size-4":
                root.style.setProperty("--sticky-top-left", "8rem");
                root.style.setProperty("--sticky-top-right", "8rem");
                root.style.fontSize = "19px";

                break;

            case "font-size-5":
                root.style.setProperty("--sticky-top-left", "8rem");
                root.style.setProperty("--sticky-top-right", "8rem");
                root.style.fontSize = "22px";
                break;
        }

        // Save the current theme to local storage
        localStorage.setItem("font_size", fontSize);
    }, [fontSize]);

    const setBgColors = (newBg) => {
        if (newBg === "bg-1") {
            setBg("bg-1");
        } else if (newBg === "bg-2") {
            setBg("bg-2");
        } else if (newBg === "bg-3") {
            setBg("bg-3");
        }
    };

    const setTextColors = (newTextColor) => {
        if (newTextColor === "color-1") {
            setTextColor("color-1");
        } else if (newTextColor === "color-2") {
            setTextColor("color-2");
        } else if (newTextColor === "color-3") {
            setTextColor("color-3");
        } else if (newTextColor === "color-4") {
            setTextColor("color-4");
        } else if (newTextColor === "color-5") {
            setTextColor("color-5");
        }
    };

    const setFontSizes = (newFontSize) => {
        if (newFontSize === "font-size-1") {
            setFontSize("font-size-1");
        } else if (newFontSize === "font-size-2") {
            setFontSize("font-size-2");
        } else if (newFontSize === "font-size-3") {
            setFontSize("font-size-3");
        } else if (newFontSize === "font-size-4") {
            setFontSize("font-size-4");
        } else if (newFontSize === "font-size-5") {
            setFontSize("font-size-5");
        }
    };

    const contextValue = useMemo(
        () => ({ setBgColors, setTextColors, setFontSizes }),
        [setBgColors, setTextColors, setFontSizes]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
