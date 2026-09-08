import React from "react";
import Button from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const DefaultIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="4" y="7" width="24" height="20" rx="3" stroke="#c8c8c8" strokeWidth="1.5" />
    <path d="M11 7V6a5 5 0 0110 0v1" stroke="#c8c8c8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 15h10M11 20h6" stroke="#c8c8c8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
}) => {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center py-16 px-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-16 h-16 rounded-[16px] bg-[#f7f7f7] border border-[#e1e1e1] flex items-center justify-center mb-5">
        {icon || <DefaultIcon />}
      </div>

      <h3 className="text-[18px] leading-[28px] font-semibold text-[#000000] mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-[14px] leading-[20px] text-[#777777] max-w-xs mb-6">
          {description}
        </p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3 mt-2">
          {secondaryAction && (
            <Button variant="outline" size="md" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant="primary"
              size="md"
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
