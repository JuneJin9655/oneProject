import { render, screen, waitFor, act, cleanup } from "@testing-library/react";
import InvoicePage from "../InvoicePage";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("MainpageLower component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("renders 'Loading...' when loading state is true", async () => {
    mockAxios.get.mockImplementationOnce(() => new Promise(() => {}));

    await act(async () => {
      render(<InvoicePage />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders 'No invoices available' for empty or null data", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("No invoices available")).toBeInTheDocument();
    });

    cleanup();

    // 测试 null 数据的情况
    mockAxios.get.mockResolvedValueOnce({ data: null });

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      const noInvoicesElements = screen.getAllByText("No invoices available");
      expect(noInvoicesElements).toHaveLength(1);
    });
  });

  test("renders invoice data when available", async () => {
    const mockData = [
      {
        id: "1",
        paymentDue: "2024-01-01",
        clientName: "John Doe",
        total: 123.45,
        status: "paid",
      },
    ];
    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("£ 123.45")).toBeInTheDocument();
    });
  });

  test("handles API error gracefully", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("No invoices available")).toBeInTheDocument();
    });
  });

  test("renders placeholders for missing fields", async () => {
    const mockData = [
      {
        id: null,
        paymentDue: "",
        clientName: null,
        total: undefined,
        status: "draft",
      },
    ];
    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("Unknown ID")).toBeInTheDocument();
      expect(screen.getByText("Unknown name")).toBeInTheDocument();
      expect(screen.getByText("£ 0.00")).toBeInTheDocument();
      expect(screen.getByText("Unknown Date")).toBeInTheDocument();
    });
  });

  test("handles extreme and invalid values", async () => {
    const mockData = [
      {
        id: "1",
        paymentDue: "2024-01-01",
        clientName: "John Doe",
        total: -123.45,
        status: "paid",
      },
      {
        id: "2",
        paymentDue: "2024-12-31",
        clientName: "Alice & Bob",
        total: 9999999999.99,
        status: "pending",
      },
      {
        id: "3",
        paymentDue: "",
        clientName: "Charlie",
        total: 200,
        status: "draft",
      },
      {
        id: "4",
        paymentDue: null,
        clientName: "Dave",
        total: 300,
        status: "paid",
      },
    ];
    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("£ 0.00")).toBeInTheDocument();
      expect(screen.getByText("£ 9999999999.99")).toBeInTheDocument();

      const unknownDates = screen.getAllByText("Unknown Date");
      expect(unknownDates).toHaveLength(2);
    });
  });

  test("displays correct and fallback status", async () => {
    const mockData = [
      {
        id: "1",
        status: "paid",
        total: 100,
        paymentDue: null,
        clientName: null,
      },
      { id: "2", status: null, total: 200, paymentDue: null, clientName: null },
    ];
    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(<InvoicePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("Paid")).toBeInTheDocument(); // 检查已支付状态
      expect(screen.getByText("Draft")).toBeInTheDocument(); // 对应 null 状态

      // 使用 getAllByText 检查多个 "Unknown Date"
      const unknownDates = screen.getAllByText("Unknown Date");
      expect(unknownDates).toHaveLength(2); // 预期有 2 个元素
    });
  });
});
