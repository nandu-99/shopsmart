import { render, screen } from "@testing-library/react";
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

describe("Navbar — Unit Tests", () => {
  it("renders SHOPSMART logo text", () => {
    renderNavbar();
    expect(screen.getByText("SHOPSMART")).toBeInTheDocument();
  });

  it('logo links to the home route "/"', () => {
    renderNavbar();
    const logo = screen.getByText("SHOPSMART").closest("a");
    expect(logo).toHaveAttribute("href", "/");
  });

  it('renders "About Us" nav link with correct href', () => {
    renderNavbar();
    const link = screen.getByRole("link", { name: /about us/i });
    expect(link).toHaveAttribute("href", "/about");
  });

  it('renders "Blog" nav link with correct href', () => {
    renderNavbar();
    const link = screen.getByRole("link", { name: /blog/i });
    expect(link).toHaveAttribute("href", "/blog");
  });

  it('renders "FAQ" nav link with correct href', () => {
    renderNavbar();
    const link = screen.getByRole("link", { name: /faq/i });
    expect(link).toHaveAttribute("href", "/faq");
  });

  it("renders search input with placeholder", () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(/search products/i);
    expect(input).toBeInTheDocument();
  });

  it("renders cart icon link", () => {
    renderNavbar();
    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toBeInTheDocument();
  });

  it('renders login link when user is not authenticated', () => {
    renderNavbar();
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("renders all 4 category navigation pills", () => {
    renderNavbar();
    const categories = ["Men", "Women", "Kids", "Accessories"];
    categories.forEach((cat) => {
      expect(screen.getByRole("link", { name: cat })).toBeInTheDocument();
    });
  });
});
