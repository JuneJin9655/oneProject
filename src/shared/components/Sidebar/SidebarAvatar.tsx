import React from "react";
import clsx from "clsx";
import ThemeToggle from "../../../features/theme/components/ThemeToggle";

const SidebarAvatar: React.FC = () => {
  return (
    <div
      className={clsx(
        "absolute flex h-[117px] w-[103px]",
        "bottom-[24px] justify-center"
      )}
    >
      {/* Moon/Sun Toggle */}
      <ThemeToggle />
      {/* Avatar */}
      <button className="w-[40px] h-[40px] absolute bottom-0">
        <img
          src="/images/image-avatar.jpg"
          alt="avatar"
          className="rounded-full"
          loading="lazy"
        />
      </button>
    </div>
  );
};

export default SidebarAvatar;
