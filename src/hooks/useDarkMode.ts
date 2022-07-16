import { useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (window) {
      window.localStorage.setItem("theme", theme);
      document.getElementsByTagName("html")[0].classList.toggle("dark");
    }
  }

  return [theme, toggleTheme] as const;
}

export { useDarkMode };