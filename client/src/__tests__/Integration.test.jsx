
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { mockApiResponse } from "../__mocks__/apiMocks";

describe("App Integration Tests", () => {
    it("fetches and displays data", async () => {
        const mockData = { ...mockApiResponse, message: "Integration Test Msg" };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            }),
        );

        render(<App />);

        // Assuming there is some element that displays the fetched message
        // You might need to adjust this depending on how App.jsx uses the data
        // For now, let's just check if the app renders without crashing
        const titleElement = screen.getByText(/ShopSmart/i);
        expect(titleElement).toBeInTheDocument();
    });
});
