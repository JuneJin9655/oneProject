import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Sidebar from "./shared/components/Sidebar/Sidebar";
import InvoicePage from "./features/invoices/pages/InvoicePage";
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
        <InvoicePage />
      </div>
    </div>
  );
};

export default App;
