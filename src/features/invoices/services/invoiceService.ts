import axios from "axios";
import { Invoice } from "../types";

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await axios.get<Invoice[]>("/api/invoices");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch invoices", error);
    return [];
  }
};
