import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Sidebar from "./components/Sidebar/Sidebar";
import Mainpage from "./components/Mainpage/Mainpage";
import clsx from "clsx";

const App: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div>
      <div className={clsx("flex h-vh  bg-bg", "dark:bg-dkBg")}>
        <Sidebar />
        <Mainpage />
      </div>
    </div>
  );
};

export default App;
