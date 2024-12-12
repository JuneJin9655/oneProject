import React from "react";
import { useInvoices } from "../hooks/useInvoices";
import InvoiceRow from "../components/InvoiceRow";
import InvoiceHeader from "../components/InvoiceHeader"; // 原 MainpageUpper
import clsx from "clsx";

const InvoicePage: React.FC = () => {
  const { loading, invoices } = useInvoices();

  const statusStyles = {
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
  };

  if (loading) return <p>Loading...</p>;
  if (invoices.length === 0) return <p>No invoices available</p>;

  return (
    <div className={clsx("flex flex-1 justify-center")}>
      <div className="grid grid-row-2 gap-5">
        {/* Header Section */}
        <InvoiceHeader invoiceCount={invoices.length} />

        {/* Invoice List Section */}
        <div className="grid gap-y-4 w-full">
          {invoices.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              styles={statusStyles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
