import React from "react";
import clsx from "clsx";

const MainpageUpper: React.FC = () => {
  return (
    <div
      className={clsx(
        //position
        "flex items-center justify-between",
        // size
        "mt-[66px]"
      )}
    >
      {/* ---------------------------left------------------------- */}
      <div>
        <h1
          className={clsx(
            //text
            "text-heading-l font-bold dark:text-white"
          )}
        >
          Invoices
        </h1>
        <p className="text-heading-s-variant text-ctHg mt-[12px] dark:text-dkHg">
          There are 7 totol Invoices
        </p>
      </div>

      {/* ---------------------------------right -------------------------*/}
      <div className="flex items-center">
        {/* -------------------------------list------------------------ */}
        <div className="flex">
          <p
            className={clsx(
              "text-heading-s font-bold",
              "mr-[14px]",
              "dark:text-white"
            )}
          >
            Filter by status
          </p>
          <button>
            <img src="/images/icon-arrow-down.svg" alt="down" />
          </button>
        </div>
        {/* ------------------------------button-------------------------- */}

        <button
          className={clsx(
            //base
            "w-[150px] h-[48px] bg-ctP rounded-full",
            "flex ml-[40.54px] items-center"
          )}
        >
          <div className="flex w-8 h-8 bg-white ml-2 rounded-full items-center justify-center">
            <img src="/images/icon-plus.svg" alt="plus" />
          </div>

          <div>
            <p className="text-heading-s font-bold text-white ml-2">
              New Invoice
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MainpageUpper;
