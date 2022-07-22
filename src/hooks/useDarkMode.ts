import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.getElementsByTagName("html")[0].classList.remove("dark");
    } else {
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  }

  useEffect(() => {
    const savedMode = window.localStorage.getItem("theme");
    if (savedMode && savedMode !== theme) {
      toggleTheme();
    }
  }, []);

  return [theme, toggleTheme] as const;
}

export { useDarkMode };