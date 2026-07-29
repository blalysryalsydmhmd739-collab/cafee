"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Optional max width class, e.g. "max-w-2xl". Defaults to max-w-2xl */
  maxWidthClass?: string;
  /** Whether to show the close button. Defaults to true */
  showCloseButton?: boolean;
  /** Additional className for the modal panel */
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidthClass = "max-w-2xl",
  showCloseButton = true,
  className = "",
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — click to close */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Centering wrapper — flex so the modal is always perfectly centered */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              // Stop click bubbling so clicking inside the modal doesn't close it
              onClick={(e) => e.stopPropagation()}
              className={`
                relative w-full ${maxWidthClass}
                max-h-[90vh] overflow-y-auto
                bg-white dark:bg-stone-900
                rounded-3xl shadow-2xl
                border border-stone-200/60 dark:border-stone-800/60
                ${className}
              `}
            >
              {/* Close button — top-left for RTL */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  aria-label="إغلاق"
                  className="absolute top-4 left-4 z-10 p-2 rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-white transition-all duration-200 backdrop-blur-sm"
                >
                  <X size={18} />
                </button>
              )}

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
