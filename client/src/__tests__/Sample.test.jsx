
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { mockApiResponse } from "../__mocks__/apiMocks";

describe("App Unit Tests", () => {
    it("renders ShopSmart title", () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve(mockApiResponse),
            }),
        );
        render(<App />);
        const titleElement = screen.getByText(/ShopSmart/i);
        expect(titleElement).toBeInTheDocument();
    });
});
