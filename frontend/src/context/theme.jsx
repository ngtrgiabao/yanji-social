import { createContext, useEffect, useMemo, useState } from "react";
import { TextColorMap, ThemeMap, FontSizeMap } from "../constant/theme";
import { LocalStorageKeys } from "../constant/local-storage-key";

const ThemeContext = createContext({
  setBgColors: () => {},
  setTextColors: () => {},
  setFontSizes: () => {},
});

const ThemeProvider = ({ children }) => {
  const [bg, setBg] = useState("bg-1");
  const [textColor, setTextColor] = useState("color-1");
  const [fontSize, setFontSize] = useState("fs-1");

  const root = document.documentElement;

  useEffect(() => {
    // Retrieve the saved theme from local storage
    const savedBgTheme = localStorage.getItem(
      LocalStorageKeys.BACKGROUND_THEME,
    );
    const saveTextColor = localStorage.getItem(LocalStorageKeys.TEXT_COLOR);
    const saveFontSize = localStorage.getItem(LocalStorageKeys.FONTSIZE);

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
    const themeProperties = ThemeMap[bg];

    Object.entries(themeProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    localStorage.setItem(LocalStorageKeys.BACKGROUND_THEME, bg);
  }, [bg]);

  // Set Text color
  useEffect(() => {
    const textColorProperties = TextColorMap[textColor];

    Object.entries(textColorProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    localStorage.setItem(LocalStorageKeys.TEXT_COLOR, textColor);
  }, [textColor]);

  //TODO optimize fontsize

  // Set Font size
  useEffect(() => {
    switch (fontSize) {
      case "fs-1":
        root.style.setProperty("--sticky-top-left", "8rem");
        root.style.setProperty("--sticky-top-right", "8rem");
        root.style.fontSize = "10px";

        break;

      case "fs-2":
        root.style.setProperty("--sticky-top-left", "8.4rem");
        root.style.setProperty("--sticky-top-right", "8.4rem");
        root.style.fontSize = "11.5px";

        break;

      case "fs-3":
        root.style.setProperty("--sticky-top-left", "8rem");
        root.style.setProperty("--sticky-top-right", "8rem");
        root.style.fontSize = "16px";

        break;

      case "fs-4":
        root.style.setProperty("--sticky-top-left", "8rem");
        root.style.setProperty("--sticky-top-right", "8rem");
        root.style.fontSize = "19px";

        break;

      case "fs-5":
        root.style.setProperty("--sticky-top-left", "8rem");
        root.style.setProperty("--sticky-top-right", "8rem");
        root.style.fontSize = "22px";
        break;
    }

    // Save the current theme to local storage
    localStorage.setItem(LocalStorageKeys.FONTSIZE, fontSize);
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
    if (newFontSize === "fs-1") {
      setFontSize("fs-1");
    } else if (newFontSize === "fs-2") {
      setFontSize("fs-2");
    } else if (newFontSize === "fs-3") {
      setFontSize("fs-3");
    } else if (newFontSize === "fs-4") {
      setFontSize("fs-4");
    } else if (newFontSize === "fs-5") {
      setFontSize("fs-5");
    }
  };

  const contextValue = useMemo(
    () => ({ setBgColors, setTextColors, setFontSizes }),
    [setBgColors, setTextColors, setFontSizes],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
