import React from "react";

export type AlertVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "clinical-warning"
  | "ai-suggestion";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { container: string; icon: React.ReactNode; iconColor: string; titleColor: string; textColor: string }
> = {
  info: {
    container: "bg-[#f0f4ff] border border-[#e0e9ff]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-[#6366f1]",
    titleColor: "text-[#4338ca]",
    textColor: "text-[#4f46e5]",
  },
  success: {
    container: "bg-[#f0fdf4] border border-[#dcfce7]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconColor: "text-[#22c55e]",
    titleColor: "text-[#15803d]",
    textColor: "text-[#16a34a]",
  },
  warning: {
    container: "bg-[#fffbeb] border border-[#fef3c7]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L14.5 13H1.5L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 7v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-[#f59e0b]",
    titleColor: "text-[#b45309]",
    textColor: "text-[#d97706]",
  },
  error: {
    container: "bg-[#fef2f2] border border-[#fee2e2]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-[#ef4444]",
    titleColor: "text-[#b91c1c]",
    textColor: "text-[#dc2626]",
  },
  "clinical-warning": {
    container: "bg-[#fffbeb] border border-l-4 border-[#fef3c7] border-l-[#f59e0b]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L15 14H1L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M8 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    iconColor: "text-[#f59e0b]",
    titleColor: "text-[#92400e]",
    textColor: "text-[#b45309]",
  },
  "ai-suggestion": {
    container: "bg-gradient-to-r from-[#f5e6ff] to-[#f7fbcc] border border-[#d199ff]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1l1.5 4.5H14l-3.75 2.75 1.5 4.5L8 10l-3.75 2.75 1.5-4.5L2 5.5h4.5L8 1z" fill="currentColor" />
      </svg>
    ),
    iconColor: "text-[#a20eff]",
    titleColor: "text-[#710ab7]",
    textColor: "text-[#8a0cdb]",
  },
};

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  onDismiss,
  icon,
  action,
  className = "",
}) => {
  const config = variantConfig[variant];

  return (
    <div
      role="alert"
      className={[
        "flex gap-3 rounded-[12px] p-4",
        config.container,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true">
        {icon || config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-[14px] leading-[20px] font-semibold mb-1 ${config.titleColor}`}>
            {title}
          </p>
        )}
        <div className={`text-[14px] leading-[20px] ${config.textColor}`}>{children}</div>
        {action && (
          <button
            onClick={action.onClick}
            className={`mt-2 text-[13px] font-semibold underline underline-offset-2 ${config.titleColor} hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] rounded`}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={`flex-shrink-0 p-0.5 rounded-[4px] ${config.textColor} hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff]`}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert;
