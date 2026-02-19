
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { mockApiResponse } from "../__mocks__/apiMocks";

describe("App Integration", () => {
    it("fetches data on mount and renders children", async () => {
         global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve(mockApiResponse),
            }),
        );
        
        render(<App />);

        // Verify key components are rendered
        expect(screen.getByText(/SHOPSMART/i)).toBeInTheDocument(); // Navbar
        expect(screen.getByText(/Unleash Your Style/i)).toBeInTheDocument(); // Hero
        expect(screen.getByText(/FAST DELIVERY/i)).toBeInTheDocument(); // BrandTicker

        // Wait to ensure any useEffects have run (even if we don't display the fetch result directly)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    });
});
