export interface Invoice {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: "paid" | "pending" | "draft";
}
