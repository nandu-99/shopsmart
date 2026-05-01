import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("App Integration — Route Rendering", () => {
  it("renders Navbar on the home route (/)", () => {
    render(<App />);
    expect(screen.getByText("SHOPSMART")).toBeInTheDocument();
  });

  it("home route (/) renders Hero heading", () => {
    render(<App />);
    expect(screen.getByText(/unleash your style/i)).toBeInTheDocument();
  });

  it('"About Us" link points to /about', () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /about us/i });
    expect(link).toHaveAttribute("href", "#/about");
  });

  it('"Blog" link points to /blog', () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /blog/i });
    expect(link).toHaveAttribute("href", "#/blog");
  });

  it('"FAQ" link points to /faq', () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /faq/i });
    expect(link).toHaveAttribute("href", "#/faq");
  });

  it("Cart link is rendered", () => {
    render(<App />);
    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toBeInTheDocument();
  });

  it("Login link is shown when user is unauthenticated", () => {
    render(<App />);
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toHaveAttribute("href", "#/login");
  });

  it("'All' link points to /collections", () => {
    render(<App />);
    const allLink = screen.getByRole("link", { name: /all/i });
    expect(allLink).toHaveAttribute("href", "#/collections");
  });

  it("renders the shop now link on the home page", () => {
    render(<App />);
    expect(
      screen.getByRole("link", { name: /shop now/i }),
    ).toBeInTheDocument();
  });
});
