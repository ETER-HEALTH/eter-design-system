import React from "react";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ai-insight";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-[#f7f7f7] text-[#333333] border border-[#e1e1e1]",
  primary: "bg-[#f5e6ff] text-[#710ab7] border border-[#d199ff]",
  accent: "bg-[#f7fbcc] text-[#5d7708] border border-[#c4e62e]",
  success: "bg-[#f0fdf4] text-[#15803d] border border-[#dcfce7]",
  warning: "bg-[#fffbeb] text-[#b45309] border border-[#fef3c7]",
  error: "bg-[#fef2f2] text-[#dc2626] border border-[#fee2e2]",
  "ai-insight": [
    "bg-gradient-to-r from-[#f5e6ff] to-[#f7fbcc]",
    "text-[#710ab7] border border-[#d199ff]",
  ].join(" "),
};

const dotColors: Record<BadgeVariant, string> = {
  neutral: "bg-[#777777]",
  primary: "bg-[#a20eff]",
  accent: "bg-[#c1e328]",
  success: "bg-[#22c55e]",
  warning: "bg-[#f59e0b]",
  error: "bg-[#ef4444]",
  "ai-insight": "bg-[#a20eff]",
};

const sizeStyles = {
  sm: "h-5 px-2 text-[11px] gap-1",
  md: "h-6 px-2.5 text-[12px] gap-1.5",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  dot = false,
  size = "md",
  children,
  className = "",
  ...props
}) => {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-semibold leading-none whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {variant === "ai-insight" && !dot && (
        <span className="mr-0.5" aria-hidden="true">✦</span>
      )}
      {children}
    </span>
  );
};

export default Badge;
