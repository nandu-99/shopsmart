import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Hero from "../../components/Hero";

const renderHero = () =>
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  );

describe("Hero — Unit Tests", () => {
  it('renders the main heading "Unleash Your Style"', () => {
    renderHero();
    expect(screen.getByText(/unleash your style/i)).toBeInTheDocument();
  });

  it('renders the "Shop Now" CTA link', () => {
    renderHero();
    expect(
      screen.getByRole("link", { name: /shop now/i }),
    ).toBeInTheDocument();
  });

  it('renders the "15 Million+" customer stat', () => {
    renderHero();
    expect(screen.getByText(/15 Million\+/i)).toBeInTheDocument();
  });

  it("renders 4 avatar images from pravatar", () => {
    renderHero();
    const avatars = screen.getAllByAltText("user");
    expect(avatars).toHaveLength(4);
    avatars.forEach((img) => {
      expect(img.src).toContain("pravatar.cc");
    });
  });

  it("renders the hero main image with correct alt text", () => {
    renderHero();
    expect(screen.getByAltText("Man in sweater")).toBeInTheDocument();
  });

  it("renders the Men collection card image", () => {
    renderHero();
    expect(screen.getByAltText("Men collection")).toBeInTheDocument();
  });

  it("renders the Women collection card image", () => {
    renderHero();
    expect(screen.getByAltText("Women collection")).toBeInTheDocument();
  });

  it('renders the "Explore now" link on the third card', () => {
    renderHero();
    expect(
      screen.getByRole("link", { name: /explore now/i }),
    ).toBeInTheDocument();
  });

  // it("renders all 5 brand logo labels", () => {
  //   render(<Hero />);
  //   const brands = [
  //     "GRAPHIC STUDIO",
  //     "S. SALVA",
  //     "GOLDEN STUDIO",
  //     "FURNITURE DESIGN",
  //     "TRAVEL LOOKBOOK",
  //   ];
  //   brands.forEach((brand) => {
  //     expect(screen.getByText(brand)).toBeInTheDocument();
  //   });
  // });

  it('renders the "Models wearing full outfits" text', () => {
    renderHero();
    expect(screen.getByText(/models wearing/i)).toBeInTheDocument();
  });
});
