import React from "react";
import clsx from "clsx";
import MainpageUpper from "./MainpageUpper";
import MainpageLower from "./MainpageLower";

const Mainpage: React.FC = () => {
  return (
    <div className={clsx("flex flex-1 justify-center")}>
      <div className="grid grid-row-2 gap-16">
        <MainpageUpper />
        <MainpageLower />
      </div>
    </div>
  );
};

export default Mainpage;
