
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../Hero";

describe("Hero", () => {
    it("renders main heading", () => {
        render(<Hero />);
        expect(screen.getByText(/Unleash Your Style/i)).toBeInTheDocument();
        expect(screen.getByText(/Shop the Latest Trends/i)).toBeInTheDocument();
    });

    it("renders call to action buttons", () => {
        render(<Hero />);
        expect(screen.getByRole("button", { name: /Shop Now/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Explore more/i })).toBeInTheDocument();
    });
    
    it("renders review count", () => {
        render(<Hero />);
        expect(screen.getByText(/25 Million\+/i)).toBeInTheDocument();
    });
});
