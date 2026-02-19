
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BrandTicker from "../BrandTicker";

describe("BrandTicker", () => {
    it("renders all brand promises", () => {
        render(<BrandTicker />);
        expect(screen.getByText(/FAST DELIVERY/i)).toBeInTheDocument();
        expect(screen.getByText(/SECURE PAYMENT/i)).toBeInTheDocument();
        expect(screen.getByText(/TOP QUALITY/i)).toBeInTheDocument();
        expect(screen.getByText(/HAPPY CUSTOMERS/i)).toBeInTheDocument();
        expect(screen.getByText(/GRAPHIC STUDIO/i)).toBeInTheDocument();
    });
});
