"use client";

import { useState, createContext, useContext } from "react";
import { cn } from "./utils";

type ToastType = "success" | "error";

interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
//   description?: string;
}

interface ToastContextProps {
  showToast: (toast: { type: ToastType; title: string }) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function showToast(toast: { type: ToastType; title: string; description?: string }) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000); // auto hide in 3s
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "w-72 rounded-lg shadow-lg p-4 border text-sm animate-in fade-in slide-in-from-right",
              t.type === "success"
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-red-50 border-red-400 text-red-800"
            )}
          >
            <p className="font-semibold">{t.title}</p>
            {/* {t.description && <p className="text-xs opacity-80">{t.description}</p>} */}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return context;
}
