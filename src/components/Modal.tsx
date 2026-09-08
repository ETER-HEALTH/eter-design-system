import React, { useEffect, useRef } from "react";
import Button from "./Button";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    variant?: "primary" | "destructive";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  size = "md",
  className = "",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/48 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        tabIndex={-1}
        className={[
          "relative w-full bg-white rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.16)]",
          "flex flex-col max-h-[90vh]",
          "focus:outline-none",
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-[#e1e1e1] flex-shrink-0">
          <div>
            <h2
              id="modal-title"
              className="text-[20px] leading-[28px] font-semibold text-[#000000]"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-description"
                className="mt-1 text-[14px] leading-[20px] text-[#777777]"
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-[8px] text-[#777777] hover:bg-[#f7f7f7] hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] flex-shrink-0"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        {children && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {children}
          </div>
        )}

        {/* Footer */}
        {(primaryAction || secondaryAction) && (
          <div className="flex items-center justify-end gap-2 px-6 pb-6 pt-4 border-t border-[#e1e1e1] flex-shrink-0">
            {secondaryAction && (
              <Button variant="outline" size="md" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant={primaryAction.variant ?? "primary"}
                size="md"
                onClick={primaryAction.onClick}
                loading={primaryAction.loading}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
