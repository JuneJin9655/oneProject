import React from "react";
import clsx from "clsx";

const SidebarIcon: React.FC = () => {
  return (
    <div
      className={clsx(
        "relative h-[103px] w-[103px]", // size
        "overflow-hidden rounded-br-[20px]", // corners
      )}
    >
      {/* Upper part */}
      <div className="w-[103px] h-[103px] bg-ctP rounded-r-[20px] flex justify-center items-center">
        {/* Circle */}
        <div className="relative w-[40px] h-[40px] bg-white rounded-full z-10">
          {/* Triangle inside the circle */}
          <div
            className={clsx(
              "absolute inset-0 w-0 h-0", // size
              "border-l-[14.425px] border-l-transparent", // left border
              "border-r-[14.425px] border-r-transparent", // right border
              "border-t-[29px] border-t-ctP", // top border
              "top-[15%] left-[50%] transform -translate-x-1/2 -translate-y-1/2", // position
            )}
          ></div>
        </div>
      </div>

      {/* Lower part */}
      <div className="absolute w-[103px] h-[103px] bg-ctLp top-1/2 rounded-tl-[20px]"></div>
    </div>
  );
};

export default SidebarIcon;
