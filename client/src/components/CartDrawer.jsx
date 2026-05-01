import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import Spinner from "./Spinner";

export default function CartDrawer() {
  const { user } = useAuth();
  const { cartOpen, closeCart, cartVersion, bumpCart, showToast } = useUI();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cartOpen || !user) return;
    setLoading(true);
    api
      .getCart()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [cartOpen, user, cartVersion]);

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    try {
      const updated = await api.updateCartItem(id, qty);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
      bumpCart();
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  const remove = async (id) => {
    try {
      await api.removeFromCart(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      bumpCart();
      showToast("Removed from cart");
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[95] shadow-2xl transition-transform duration-300 flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="close cart"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!user ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">Login to view your cart.</p>
              <Link
                to="/login"
                onClick={closeCart}
                className="inline-block bg-black text-white px-5 py-2 rounded-full"
              >
                Login
              </Link>
            </div>
          ) : loading ? (
            <Spinner label="Loading cart..." />
          ) : items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 p-4">
                  <img
                    src={i.product.image}
                    alt={i.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{i.product.name}</p>
                    <p className="text-sm text-gray-500">
                      ${i.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(i.id, i.quantity - 1)}
                        className="w-7 h-7 rounded-full border text-sm hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">
                        {i.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(i.id, i.quantity + 1)}
                        className="w-7 h-7 rounded-full border text-sm hover:bg-gray-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(i.id)}
                        className="ml-auto text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {user && items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Link
                to="/cart"
                onClick={closeCart}
                className="flex-1 text-center border border-black py-2.5 rounded-full font-medium hover:bg-gray-50"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="flex-1 text-center bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-800"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
