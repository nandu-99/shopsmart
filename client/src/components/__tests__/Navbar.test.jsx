
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "../Navbar";

describe("Navbar", () => {
    it("renders the logo", () => {
        render(<Navbar />);
        expect(screen.getByText(/SHOPSMART/i)).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<Navbar />);
        expect(screen.getByText(/New Arrivals/i)).toBeInTheDocument();
        expect(screen.getByText(/Sales/i)).toBeInTheDocument();
        expect(screen.getByText(/Man/i)).toBeInTheDocument();
        expect(screen.getByText(/Women/i)).toBeInTheDocument();
    });

    it("renders search input", () => {
        render(<Navbar />);
        expect(screen.getByPlaceholderText(/Clothing/i)).toBeInTheDocument();
    });
});
