import React, { useEffect, useState } from "react";

const useMode = () => {
  const [mode, setMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleToggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.remove("dark");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  return [mode, handleToggleMode] as [string, () => void];
};

export default useMode;
