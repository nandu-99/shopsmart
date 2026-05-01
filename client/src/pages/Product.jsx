import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/api";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast, openCart, bumpCart } = useUI();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    setAdding(true);
    try {
      await api.addToCart(Number(id), quantity);
      bumpCart();
      showToast(`${product.name} added to cart`);
      openCart();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <Spinner label="Loading product..." />;
  }
  if (error && !product) {
    return <div className="pt-20 text-center text-red-600">{error}</div>;
  }
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-sm text-gray-500">In stock: {product.stock}</p>

          <div className="flex items-center gap-3 pt-4">
            <label className="text-sm">Qty</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value) || 1))
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-20"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={adding}
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
