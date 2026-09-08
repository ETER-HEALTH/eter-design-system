import React from "react";
import Badge from "./Badge";

export type MetricVariant = "default" | "abnormal" | "critical" | "improving" | "ai-insight";
export type TrendDirection = "up" | "down" | "stable";

export interface ClinicalMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: TrendDirection;
  trendValue?: string;
  variant?: MetricVariant;
  icon?: React.ReactNode;
  description?: string;
  showBadge?: boolean;
  className?: string;
}

const variantConfig: Record<
  MetricVariant,
  { card: string; valueColor: string; badgeLabel: string; badgeVariant: "neutral" | "error" | "warning" | "success" | "ai-insight" | "primary" }
> = {
  default: {
    card: "bg-white border border-[#e1e1e1]",
    valueColor: "text-[#000000]",
    badgeLabel: "Normal",
    badgeVariant: "neutral",
  },
  abnormal: {
    card: "bg-white border border-[#fef3c7]",
    valueColor: "text-[#b45309]",
    badgeLabel: "Abnormal",
    badgeVariant: "warning",
  },
  critical: {
    card: "bg-white border border-[#fee2e2]",
    valueColor: "text-[#dc2626]",
    badgeLabel: "Critical",
    badgeVariant: "error",
  },
  improving: {
    card: "bg-white border border-[#dcfce7]",
    valueColor: "text-[#15803d]",
    badgeLabel: "Improving",
    badgeVariant: "success",
  },
  "ai-insight": {
    card: "bg-white border-t-2 border-[#e1e1e1] border-t-[#c1e328]",
    valueColor: "text-[#000000]",
    badgeLabel: "AI Insight",
    badgeVariant: "ai-insight",
  },
};

const TrendIcon: React.FC<{ direction: TrendDirection; variant: MetricVariant }> = ({
  direction,
  variant,
}) => {
  const criticalDown = variant === "critical" && direction === "down";
  const improvingUp = variant === "improving" && direction === "up";

  const color =
    direction === "stable"
      ? "text-[#777777]"
      : criticalDown || (variant === "abnormal" && direction === "up")
      ? "text-[#dc2626]"
      : improvingUp || (variant === "default" && direction === "down")
      ? "text-[#22c55e]"
      : "text-[#777777]";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={color}
      aria-hidden="true"
    >
      {direction === "up" && (
        <path d="M8 3l5 5H3l5-5z" fill="currentColor" />
      )}
      {direction === "down" && (
        <path d="M8 13l5-5H3l5 5z" fill="currentColor" />
      )}
      {direction === "stable" && (
        <path d="M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
};

export const ClinicalMetricCard: React.FC<ClinicalMetricCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  variant = "default",
  icon,
  description,
  showBadge = true,
  className = "",
}) => {
  const config = variantConfig[variant];

  return (
    <div
      className={[
        "rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
        config.card,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="article"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-[#777777]" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="text-[12px] leading-[16px] font-semibold uppercase tracking-[0.08em] text-[#777777]">
            {title}
          </span>
        </div>
        {showBadge && (
          <Badge variant={config.badgeVariant} size="sm">
            {config.badgeLabel}
          </Badge>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className={`text-[32px] leading-[40px] font-bold tabular-nums ${config.valueColor}`}>
          {value}
        </span>
        {unit && (
          <span className="text-[14px] leading-[20px] text-[#777777] font-medium">{unit}</span>
        )}
      </div>

      {/* Trend */}
      {(trend || trendValue) && (
        <div className="flex items-center gap-1">
          {trend && <TrendIcon direction={trend} variant={variant} />}
          {trendValue && (
            <span className="text-[12px] leading-[16px] text-[#777777]">{trendValue}</span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="mt-3 text-[13px] leading-[18px] text-[#777777] border-t border-[#e1e1e1] pt-3">
          {description}
        </p>
      )}
    </div>
  );
};

export default ClinicalMetricCard;
