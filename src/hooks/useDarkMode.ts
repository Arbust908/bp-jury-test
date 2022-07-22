import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    window.localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.getElementsByTagName("html")[0].classList.remove("dark");
    } else {
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  }

  useEffect(() => {
    const savedMode = window.localStorage.getItem("theme");
    console.log("savedMode", savedMode)
    if (savedMode && savedMode !== theme) {
      console.log(theme, savedMode)
      toggleTheme();
    }
  }, []);

  return [theme, toggleTheme] as const;
}

export { useDarkMode };