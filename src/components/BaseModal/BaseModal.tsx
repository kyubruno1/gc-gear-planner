import { ReactNode, useEffect } from "react";

interface BaseModalProps {
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
}

export function BaseModal({ onClose, children, maxWidth = "750px", maxHeight = "750px" }: BaseModalProps) {
  // Fecha com ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] text-outline"
      onClick={onClose}
    >
      <div
        className="relative overflow-y-auto p-5 rounded-md shadow-lg bg-primary border border-primary"
        style={{ maxWidth, maxHeight, width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
          aria-label="Fechar modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}