import React, { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

// type: "success" | "error"
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-6 right-6 z-[99999] flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl
        animate-slide-in transition-all
        ${isSuccess
          ? "bg-green-500/10 border-green-500/30 text-green-400"
          : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}
    >
      {isSuccess
        ? <CheckCircle2 size={18} className="shrink-0" />
        : <XCircle size={18} className="shrink-0" />
      }
      <p className="text-sm font-semibold tracking-wide">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;