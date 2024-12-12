import { http, HttpResponse } from "msw"; // 确保你使用的是 MSW 提供的 `http`
import { mockInvoices } from "./mockData"; // 引入 Mock 数据

export const handlers = [
  http.get("/api/invoices", () => {
    return HttpResponse.json(mockInvoices)
  }),
];