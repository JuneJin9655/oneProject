import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { toggleTheme } from "../store/themeSlice";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <button
      className="w-[20px] h-[20px]"
      onClick={() => dispatch(toggleTheme())}
    >
      <img
        src={isDarkMode ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}
        alt={isDarkMode ? "sun" : "moon"}
        loading="lazy"
      />
    </button>
  );
};

export default ThemeToggle;
