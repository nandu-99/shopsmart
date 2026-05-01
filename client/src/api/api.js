import { apiFetch } from "./client";

// Products
export const getProducts = (search) =>
  apiFetch(`/products${search ? `?search=${encodeURIComponent(search)}` : ""}`);

export const getProduct = (id) => apiFetch(`/products/${id}`);

export const searchProducts = (query) => getProducts(query);

// Auth
export const register = (email, password, name) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });

export const login = (email, password) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const me = () => apiFetch("/auth/me");

// Cart
export const getCart = () => apiFetch("/cart");

export const addToCart = (productId, quantity = 1) =>
  apiFetch("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

export const updateCartItem = (id, quantity) =>
  apiFetch(`/cart/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

export const removeFromCart = (id) =>
  apiFetch(`/cart/${id}`, { method: "DELETE" });

// Checkout
export const checkout = () => apiFetch("/checkout", { method: "POST" });

export const getOrders = () => apiFetch("/checkout/orders");
