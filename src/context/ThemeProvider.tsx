import React from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import ThemeContext, { initialThemeState } from "./ThemeContext";

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', initialThemeState.theme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
