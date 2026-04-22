import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../commonStyles/theme";

export const ThemeWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme-mode-denmark") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme-mode-denmark", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const currentTheme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={{ ...currentTheme, toggleTheme, themeMode }}>
      {children}
    </ThemeProvider>
  );
};
