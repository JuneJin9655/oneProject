import React from "react";
import clsx from "clsx";
import { Invoice } from "../types";

const StatusBadge: React.FC<{
  status: Invoice["status"];
  styles: {
    background: Record<Invoice["status"], string>;
    circle: Record<Invoice["status"], string>;
    text: Record<Invoice["status"], string>;
  };
}> = ({ status, styles }) => (
  <span
    className={clsx(
      "h-10 mr-5 flex items-center justify-center rounded-[6px] bg-opacity-[0.0571]",
      styles.background[status]
    )}
  >
    <div className="flex items-center">
      <div
        className={clsx("w-2 h-2 mr-[6px] rounded-full", styles.circle[status])}
      ></div>
      <p className={clsx("text-heading-s font-bold", styles.text[status])}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft"}
      </p>
    </div>
  </span>
);

export default StatusBadge;
