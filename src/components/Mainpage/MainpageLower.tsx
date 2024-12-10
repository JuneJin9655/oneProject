import React, { useEffect, useState, useMemo } from "react";
import axios, { AxiosError } from "axios";
import clsx from "clsx";

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
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoding(true);
        const response = await axios.get<Invoice[]>("/api/invoices");
        if (Array.isArray(response.data)) {
          setInvoices(response.data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch invoices");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoding(false);
      }
    };

    fetchInvoices();
  }, []);

  const statusStyles = useMemo(
    () => ({
      background: {
        paid: "bg-ctGr",
        pending: "bg-ctYl",
        draft: "bg-ctGy",
      },
      circle: {
        paid: "bg-ctGr",
        pending: "bg-ctYl",
        draft: "bg-black",
      },
      text: {
        paid: "text-ctGr",
        pending: "text-ctYl",
        draft: "text-heading-s",
      },
    }),
    []
  );

  if (error) return <p>Error: {error}</p>;
  if (!invoices.length) return <p>Loading...</p>;

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
            <p className="dark:text-dkwt">{invoice.id}</p>
          </span>
          <span
            className={clsx(
              "flex items-center text-ctHg mr-[59px]",
              "dark:text-dkHg"
            )}
          >
            Due{" "}
            {new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(invoice.paymentDue))}
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
            £ {invoice.total.toFixed(2)}
          </span>
          <StatusBadge status={invoice.status} styles={statusStyles} />
          <button className="flex items-center">
            <img src="/images/icon-arrow-right.svg" alt="right" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainpageLower;
