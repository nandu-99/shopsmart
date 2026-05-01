import { CheckCircle2, XCircle } from "lucide-react";
import { useUI } from "../context/UIContext";

export default function ToastContainer() {
  const { toasts } = useUI();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm pointer-events-auto animate-[slide-in_0.2s_ease-out] ${
            t.type === "error" ? "bg-red-600 text-white" : "bg-black text-white"
          }`}
        >
          {t.type === "error" ? (
            <XCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
