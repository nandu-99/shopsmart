import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Navbar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";
import { UIProvider } from "../../context/UIContext";

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <UIProvider>
          <Navbar />
        </UIProvider>
      </AuthProvider>
    </MemoryRouter>,
  );

describe("Navbar Integration Tests", () => {
  it("About Us link has correct href for routing", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("Blog link has correct href for routing", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /blog/i })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("Cart icon link is rendered", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  it("Login link is shown when user is unauthenticated", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("Search input accepts typed text", async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText(/search products/i);
    await userEvent.type(searchInput, "jeans");
    expect(searchInput.value).toBe("jeans");
  });

  it('"All" category pill links to /collections', () => {
    renderNavbar();
    const allLink = screen.getByRole("link", { name: /all/i });
    expect(allLink).toHaveAttribute("href", "/collections");
  });

  it('"Men" pill links to /collections with search filter', () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: "Men" })).toHaveAttribute(
      "href",
      "/collections?search=Men",
    );
  });

  it('"Women" pill links to /collections with search filter', () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: "Women" })).toHaveAttribute(
      "href",
      "/collections?search=Women",
    );
  });

  it("Logo link sits inside the nav element", () => {
    renderNavbar();
    const logo = screen.getByText("SHOPSMART");
    expect(logo.closest("nav")).toBeInTheDocument();
  });
});
