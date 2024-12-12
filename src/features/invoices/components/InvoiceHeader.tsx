import React from "react";
import clsx from "clsx";

interface InvoiceHeaderProps {
  invoiceCount: number;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ invoiceCount }) => {
  return (
    <div
      className={clsx(
        // Position
        "flex items-center justify-between",
        // Size
        "mt-[66px]"
      )}
    >
      {/* Left Section */}
      <div className="flex flex-col">
        <h1
          className={clsx(
            // Text
            "text-heading-l font-bold dark:text-white"
          )}
        >
          Invoices
        </h1>
        <p className="text-heading-s-variant text-ctHg mt-[12px] dark:text-dkHg">
          There are {invoiceCount} total invoices
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        {/* Filter by Status */}
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

        {/* New Invoice Button */}
        <button
          className={clsx(
            // Base
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

export default InvoiceHeader;
