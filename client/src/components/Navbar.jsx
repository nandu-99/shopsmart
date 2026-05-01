import { ChevronDown, LogIn, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

const Navbar = () => {
  const { user } = useAuth();
  const { openCart, cartVersion } = useUI();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState("");

  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("search") || "";
  const onCollections = location.pathname === "/collections";
  const isAllActive = onCollections && !activeCategory;

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }
    api
      .getCart()
      .then((items) =>
        setCartCount(items.reduce((s, i) => s + i.quantity, 0)),
      )
      .catch(() => setCartCount(0));
  }, [user, cartVersion]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/collections${query ? `?search=${encodeURIComponent(query)}` : ""}`,
    );
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    openCart();
  };

  return (
    <nav className="w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="font-sans text-2xl font-bold tracking-wider text-black"
          >
            SHOPSMART
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
              <Link to="/blog" className="hover:text-black">
                Blog
              </Link>
              <Link to="/faq" className="hover:text-black">
                FAQ
              </Link>
            </div>
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-2">
              {user ? (
                <Link
                  to="/profile"
                  aria-label="profile"
                  className="text-gray-800 hover:text-black"
                  title={user.name}
                >
                  <User size={20} strokeWidth={2} />
                </Link>
              ) : (
                <Link
                  to="/login"
                  aria-label="login"
                  className="text-gray-800 hover:text-black"
                >
                  <LogIn size={20} strokeWidth={2} />
                </Link>
              )}
              <a
                href="/cart"
                onClick={handleCartClick}
                aria-label="cart"
                className="text-gray-800 hover:text-black relative"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] min-w-3.5 h-3.5 px-1 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-80">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-50 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
            <button
              type="submit"
              aria-label="search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Search size={16} />
            </button>
          </form>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
            <Link
              to="/collections"
              className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isAllActive
                  ? "bg-black text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>All</span>
              <ChevronDown size={14} />
            </Link>
            {["Men", "Women", "Kids", "Accessories"].map((item) => {
              const isActive =
                onCollections && activeCategory.toLowerCase() === item.toLowerCase();
              return (
                <Link
                  key={item}
                  to={`/collections?search=${encodeURIComponent(item)}`}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
