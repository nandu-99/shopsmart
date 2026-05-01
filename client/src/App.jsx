import { Route, HashRouter as Router, Routes } from "react-router-dom";
import CartDrawer from "./components/CartDrawer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastContainer from "./components/ToastContainer";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Collection from "./pages/Collection";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <div className="font-sans text-primary">
      <AuthProvider>
        <UIProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <CartDrawer />
            <ToastContainer />
          </Router>
        </UIProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
