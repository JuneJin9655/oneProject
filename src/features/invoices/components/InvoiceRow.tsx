import React from "react";
import clsx from "clsx";
import { Invoice } from "../types";
import StatusBadge from "./StatusBadge";

interface InvoiceRowProps {
  invoice: Invoice;
  styles: {
    background: Record<Invoice["status"], string>;
    circle: Record<Invoice["status"], string>;
    text: Record<Invoice["status"], string>;
  };
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, styles }) => (
  <div
    className={clsx(
      "grid grid-cols-[150px_200px_150px_auto_150px_20px]",
      "bg-white rounded-[8px] items-center pr-6",
      "dark:bg-dkSb"
    )}
  >
    <span className="blackList text-heading-s font-bold">
      <p className="text-ctBg">#</p>
      <p className="dark:text-dkwt">{invoice.id || "Unknown ID"}</p>
    </span>
    <span
      className={clsx(
        "flex items-center text-ctHg mr-[59px]",
        "dark:text-dkHg"
      )}
    >
      Due{" "}
      {invoice.paymentDue ? (
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(invoice.paymentDue))
      ) : (
        <span>Unknown Date</span>
      )}
    </span>
    <span className={clsx("flex items-center text-ctHg", "dark:text-dkwt")}>
      {invoice.clientName || "Unknown name"}
    </span>
    <span
      className={clsx(
        "blackList text-heading-s font-bold justify-self-end",
        "dark:text-dkwt"
      )}
    >
      £ {invoice.total && invoice.total > 0 ? invoice.total.toFixed(2) : "0.00"}
    </span>
    <StatusBadge status={invoice.status} styles={styles} />
    <button className="flex items-center">
      <img src="/images/icon-arrow-right.svg" alt="right" />
    </button>
  </div>
);

export default InvoiceRow;
