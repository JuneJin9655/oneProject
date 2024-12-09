import clsx from "clsx";
import data from "../../../data.json";
import React, { useEffect, useState } from "react";
import { Invoice } from "../../mocks/mockData";

const MainpageLower: React.FC = () => {
  //API
  const [invoices, setInvoices] = useState < Invoice > [] > [];
  const [error, setError] = useState<string | null>(null);

  // time format
  const formatDate = (dataString: string): string => {
    const date = new Date(dataString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };
  // currency

  const formatCurrency = (amount: number): string => {
    const formattedNumber = new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return `£ ${formattedNumber}`;
  };

  const backGroundStyle = {
    paid: " bg-ctGr",
    pending: "bg-ctYl",
    draft: "bg-ctGy",
  };

  const circleStyle = {
    paid: "bg-ctGr",
    pending: "bg-ctYl",
    draft: "bg-black",
  };

  const statusStyle = {
    paid: " text-ctGr",
    pending: "text-ctYl",
    draft: "text-heading-s",
  };

  const capitalFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="grid gap-y-4 h-vh">
      {data.map((invoice, index) => (
        <div
          key={index}
          className={clsx(
            //Each
            "grid grid-cols-[150px_200px_150px_auto_150px_20px]",
            //base
            "bg-white rounded-[8px] items-center pr-6",
            "dark:bg-dkSb"
          )}
        >
          {/* id */}
          <span className="blackList text-heading-s font-bold">
            <p className="text-ctBg">#</p>
            <p className="dark:text-dkwt">{invoice.id}</p>
          </span>
          <span
            className={clsx(
              "flex items-center text-ctHg mr-[59px]",
              "dark:text-dkHg"
            )}
          >
            Due {formatDate(invoice.paymentDue)}
          </span>
          <span
            className={clsx("flex items-center text-ctHg", "dark:text-dkwt")}
          >
            {invoice.clientName}
          </span>
          <span
            className={clsx(
              "blackList text-heading-s font-bold justify-self-end",
              "dark:text-dkwt"
            )}
          >
            {formatCurrency(invoice.total)}
          </span>

          <span
            className={clsx(
              "h-10 mr-5 flex items-center justify-center rounded-[6px]",
              "bg-opacity-[0.0571]",
              backGroundStyle[invoice.status as "paid" | "pending" | "draft"]
            )}
          >
            <div className="flex items-center">
              <div
                className={clsx(
                  "w-2 h-2 mr-[6px] rounded-full",
                  circleStyle[invoice.status as "paid" | "pending" | "draft"],
                  { "dark:bg-ctGy": invoice.status === "draft" }
                )}
              ></div>

              <p
                className={clsx(
                  "text-heading-s font-bold",
                  statusStyle[invoice.status as "paid" | "pending" | "draft"],
                  { "dark:text-ctGy": invoice.status === "draft" }
                )}
              >
                {capitalFirst(invoice.status)}
              </p>
            </div>
          </span>

          <button className="flex items-center">
            <img src="/images/icon-arrow-right.svg" alt="right" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainpageLower;
