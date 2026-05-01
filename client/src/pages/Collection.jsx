import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as api from "../api/api";
import { SkeletonCard } from "../components/Spinner";

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(search);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .getProducts(search)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search]);

  const onSearch = (e) => {
    e.preventDefault();
    setSearchParams(query ? { search: query } : {});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Collection</h1>
        <form onSubmit={onSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="border border-gray-300 rounded-full px-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-full text-sm"
          >
            Search
          </button>
        </form>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {p.category}
                </p>
                <h3 className="font-medium text-black truncate">{p.name}</h3>
                <p className="font-semibold mt-1">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
