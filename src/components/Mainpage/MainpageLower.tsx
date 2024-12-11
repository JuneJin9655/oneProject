import React, { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import axios from "axios";
import { p } from "msw/lib/core/GraphQLHandler-Cjm7JNGi";

interface Invoice {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: "paid" | "pending" | "draft";
}

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
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
    </div>
  </span>
);

const MainpageLower: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const statusStyles = useMemo(
    () => ({
      background: {
        paid: "bg-green-500",
        pending: "bg-yellow-500",
        draft: "bg-gray-500",
      },
      circle: {
        paid: "bg-green-500",
        pending: "bg-yellow-500",
        draft: "bg-gray-500",
      },
      text: {
        paid: "text-green-500",
        pending: "text-yellow-500",
        draft: "text-gray-500",
      },
    }),
    []
  );

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true); // 加载状态开始
      try {
        const response = await axios.get<Invoice[]>("/api/invoices");
        setInvoices(response.data || []);
      } catch (error) {
        console.error("Failed to fetch invoices", error);
        setInvoices([]); // 确保无数据时也能渲染
      } finally {
        setLoading(false); // 加载状态结束
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (invoices.length === 0) return <p>No invoices available</p>;

  return (
    <div className="grid gap-y-4 h-vh">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
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
          <span
            className={clsx("flex items-center text-ctHg", "dark:text-dkwt")}
          >
            {invoice.clientName || "Unknown name"}
          </span>
          <span
            className={clsx(
              "blackList text-heading-s font-bold justify-self-end",
              "dark:text-dkwt"
            )}
          >
            £{" "}
            {invoice.total && invoice.total > 0
              ? invoice.total.toFixed(2)
              : "0.00"}
          </span>
          <StatusBadge
            status={invoice.status || "Unknown"}
            styles={statusStyles}
          />
          <button className="flex items-center">
            <img src="/images/icon-arrow-right.svg" alt="right" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainpageLower;
