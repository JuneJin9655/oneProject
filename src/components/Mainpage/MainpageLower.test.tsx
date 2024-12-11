import { render, screen, waitFor, act, cleanup } from "@testing-library/react";
import MainpageLower from "./MainpageLower";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("MainpageLower component", () => {
  afterEach(() => {
    cleanup(); // 清理每次测试后的 DOM 和状态
    jest.clearAllMocks(); // 重置所有 mock 数据
  });

  test("renders 'Loading...' when loading state is true", async () => {
    mockAxios.get.mockImplementationOnce(() => new Promise(() => {})); // 模拟未完成的请求

    await act(async () => {
      render(<MainpageLower />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders 'No invoices available' when there is no data", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: [] }); // 模拟空数据

    await act(async () => {
      render(<MainpageLower />);
    });

    await waitFor(() =>
      expect(screen.getByText("No invoices available")).toBeInTheDocument()
    );
  });

  test("renders invoice data when invoices are available", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: "1",
          paymentDue: "2024-01-01",
          clientName: "John Doe",
          total: 123.45,
          status: "paid",
        },
      ],
    });

    await act(async () => {
      render(<MainpageLower />);
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("£ 123.45")).toBeInTheDocument();
    });
  });

  test("handles API error", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("Network Error")); // 模拟 API 错误

    await act(async () => {
      render(<MainpageLower />);
    });

    await waitFor(() => {
      expect(screen.getByText("No invoices available")).toBeInTheDocument();
    });
  });

  test("renders placeholder text when some fields are missing", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: null,
          paymentDue: "",
          clientName: null,
          total: undefined,
          status: "draft",
        },
      ],
    });

    await act(async () => {
      render(<MainpageLower />);
    });

    await waitFor(() => {
      expect(screen.getByText("Unknown ID")).toBeInTheDocument();
      expect(screen.getByText("Unknown name")).toBeInTheDocument();
      expect(screen.getByText("£ 0.00")).toBeInTheDocument();
      expect(screen.getByText("Unknown Date")).toBeInTheDocument();
    });
  });
});
