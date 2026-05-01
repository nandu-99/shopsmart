import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api/api";
import Spinner from "../components/Spinner";
import { useUI } from "../context/UIContext";

export default function Cart() {
  const { showToast, bumpCart } = useUI();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .getCart()
      .then(setItems)
      .catch((e) => showToast(e.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  if (loading) {
    return <Spinner label="Loading your cart..." />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-20">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/collections"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-full"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y border rounded-2xl mb-6">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 p-4">
                <img
                  src={i.product.image}
                  alt={i.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${i.product.id}`}
                    className="font-medium hover:underline"
                  >
                    {i.product.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    ${i.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(i.id, i.quantity - 1)}
                    className="w-8 h-8 rounded-full border hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{i.quantity}</span>
                  <button
                    onClick={() => updateQty(i.id, i.quantity + 1)}
                    className="w-8 h-8 rounded-full border hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right font-semibold">
                  ${(i.product.price * i.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => remove(i.id)}
                  className="text-sm text-red-600 hover:underline ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
