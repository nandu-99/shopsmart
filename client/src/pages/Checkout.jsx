import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api/api";
import Spinner from "../components/Spinner";
import { useUI } from "../context/UIContext";

export default function Checkout() {
  const { showToast, bumpCart } = useUI();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api
      .getCart()
      .then(setItems)
      .catch((e) => showToast(e.message, "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const o = await api.checkout();
      setOrder(o);
      bumpCart();
      showToast("Order placed successfully!");
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return <Spinner label="Loading checkout..." />;
  }

  if (order) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Order placed!</h1>
        <p className="text-gray-600 mb-6">
          Order #{order.id} — total ${order.total.toFixed(2)}
        </p>
        <Link
          to="/collections"
          className="inline-block bg-black text-white px-6 py-2.5 rounded-full"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link
          to="/collections"
          className="inline-block bg-black text-white px-6 py-2.5 rounded-full"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <ul className="divide-y border rounded-lg mb-6">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between p-4">
            <span>
              {i.product.name} × {i.quantity}
            </span>
            <span>${(i.product.price * i.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        onClick={placeOrder}
        disabled={placing}
        className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {placing ? "Placing order..." : "Place Order (Mock Payment)"}
      </button>
    </div>
  );
}
