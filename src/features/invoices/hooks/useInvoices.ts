import { useEffect, useState } from "react";
import { Invoice } from "../types";
import { fetchInvoices } from "../services/invoiceService";

export const useInvoices = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const loadInvoices = async () => {
      setLoading(true);
      const data = await fetchInvoices();
      setInvoices(data || []);
      setLoading(false);
    };
    loadInvoices();
  }, []);

  return { loading, invoices };
};
