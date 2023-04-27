import { useContext } from "react";

import { ThemeContext } from "../context/theme/ThemeContext";

export const useTheme = () => useContext(ThemeContext);
