import React from "react";
import Button from "./Button";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  breadcrumbs?: Array<{ label: string; href?: string; onClick?: () => void }>;
  tabs?: React.ReactNode;
  className?: string;
}

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  breadcrumbs,
  tabs,
  className = "",
}) => {
  return (
    <header
      className={[
        "border-b border-[#e1e1e1] bg-white px-8 pt-6",
        tabs ? "pb-0" : "pb-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight />
                )}
                {crumb.href || crumb.onClick ? (
                  <a
                    href={crumb.href}
                    onClick={crumb.onClick}
                    className="text-[12px] leading-[16px] font-semibold uppercase tracking-[0.08em] text-[#777777] hover:text-[#a20eff] transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[12px] leading-[16px] font-semibold uppercase tracking-[0.08em] text-[#777777]">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-start justify-between gap-4">
        {/* Left — text */}
        <div className="min-w-0">
          {eyebrow && !breadcrumbs && (
            <p className="text-[12px] leading-[16px] font-bold uppercase tracking-[0.08em] text-[#a20eff] mb-1">
              {eyebrow}
            </p>
          )}
          <h1 className="text-[32px] leading-[40px] font-bold tracking-[-0.01em] text-[#000000]">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-[16px] leading-[24px] text-[#777777] max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Right — actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            {secondaryAction && (
              <Button
                variant="outline"
                size="md"
                onClick={secondaryAction.onClick}
                leftIcon={secondaryAction.icon}
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="primary"
                size="md"
                onClick={primaryAction.onClick}
                leftIcon={primaryAction.icon}
                loading={primaryAction.loading}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      {tabs && <div className="mt-6">{tabs}</div>}
    </header>
  );
};

export default PageHeader;
