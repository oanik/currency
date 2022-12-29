import React from "react";

export const initialThemeState = {
  theme: "light",
  setTheme: (_theme: string) => null,
};

const ThemeContext = React.createContext(initialThemeState);
export default ThemeContext;
