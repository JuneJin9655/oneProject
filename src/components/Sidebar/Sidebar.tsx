import React from "react";
import clsx from "clsx";
import SidebarIcon from "./SidebarIcon";
import SidebarAvatar from "./SidebarAvatar";

const Sidebar: React.FC = () => {
  return (
    <div
      className={clsx(
        "relative min-h-screen w-[103px]", // size
        "rounded-tr-[20px] rounded-br-[20px]",
        "bg-ltSb dark:bg-dkSb",
        // background and corners
      )}
    >
      {/* Upper Icon */}
      <SidebarIcon />

      {/* Bottom Avatar and Moon Icon */}
      <SidebarAvatar />
    </div>
  );
};

export default Sidebar;
