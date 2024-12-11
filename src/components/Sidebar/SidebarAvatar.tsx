import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { toggleTheme } from "../../features/theme/themeSlice";

const SidebarAvatar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div
      className={clsx(
        "absolute flex h-[117px] w-[103px]", // block style
        "bottom-[24px] justify-center", // position
      )}
    >
      {/* Moon Icon */}
      <button
        className="w-[19.99px] h-[19.9px]"
        onClick={() => dispatch(toggleTheme())}
      >
        <img
          src={isDarkMode ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}
          alt={isDarkMode ? "sun" : "moon"}
          loading="lazy"
        />
      </button>
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
