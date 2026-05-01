import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/api";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { showToast } = useUI();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getOrders()
      .then(setOrders)
      .catch((e) => showToast(e.message, "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    showToast("Logged out");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-600 mt-2">{user?.name}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      {loading ? (
        <Spinner label="Loading orders..." />
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="border rounded-2xl p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order #{o.id}</span>
                <span className="text-sm text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-2">
                {o.items.map((it) => (
                  <li key={it.id}>
                    {it.product.name} × {it.quantity} — $
                    {(it.priceAtPurchase * it.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-right font-semibold">
                Total: ${o.total.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
