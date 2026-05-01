import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  addToCart,
  getCart,
  getProduct,
  getProducts,
  removeFromCart,
  searchProducts,
} from "../../api/api";

const mockFetch = (data, ok = true, status = 200) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      text: () => Promise.resolve(JSON.stringify(data)),
    }),
  );
};

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("API — Unit Tests (mocked fetch)", () => {
  it("getProducts() calls GET /api/products", async () => {
    mockFetch([{ id: 1, name: "T-Shirt" }]);
    await getProducts();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products",
      expect.any(Object),
    );
  });

  it("getProducts() returns parsed JSON array", async () => {
    mockFetch([
      { id: 1, name: "Dress" },
      { id: 2, name: "Jeans" },
    ]);
    const result = await getProducts();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Dress");
  });

  it("getProduct(id) calls GET /api/products/:id", async () => {
    mockFetch({ id: 42, name: "Sneakers" });
    const result = await getProduct(42);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products/42",
      expect.any(Object),
    );
    expect(result.id).toBe(42);
  });

  it("getCart() calls GET /api/cart", async () => {
    mockFetch([]);
    await getCart();
    expect(global.fetch).toHaveBeenCalledWith("/api/cart", expect.any(Object));
  });

  it("addToCart(productId, quantity) sends POST to /api/cart with correct body", async () => {
    mockFetch({ id: 1 });
    await addToCart(3, 2);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/cart",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ productId: 3, quantity: 2 }),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("removeFromCart(id) sends DELETE to /api/cart/:id", async () => {
    mockFetch({ ok: true });
    await removeFromCart(7);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/cart/7",
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  it("searchProducts(query) encodes query in URL", async () => {
    mockFetch([{ id: 1, name: "Blue Dress" }]);
    await searchProducts("blue dress");
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products?search=blue%20dress",
      expect.any(Object),
    );
  });

  it("attaches Authorization header when token is present", async () => {
    localStorage.setItem("shopsmart_token", "abc.def.ghi");
    mockFetch([]);
    await getProducts();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer abc.def.ghi",
        }),
      }),
    );
  });

  it("throws error with status when response is not ok", async () => {
    mockFetch({ error: "Unauthorized" }, false, 401);
    await expect(getCart()).rejects.toThrow("Unauthorized");
  });
});
