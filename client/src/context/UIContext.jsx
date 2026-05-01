import { createContext, useCallback, useContext, useState } from "react";

const UIContext = createContext(null);

let toastId = 0;

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartVersion, setCartVersion] = useState(0);

  const showToast = useCallback((message, type = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const bumpCart = useCallback(() => setCartVersion((v) => v + 1), []);

  return (
    <UIContext.Provider
      value={{
        toasts,
        showToast,
        cartOpen,
        openCart,
        closeCart,
        cartVersion,
        bumpCart,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
