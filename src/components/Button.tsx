import React from "react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#a20eff] text-white",
    "hover:bg-[#8a0cdb]",
    "active:bg-[#710ab7]",
    "disabled:bg-[#e1e1e1] disabled:text-[#aaaaaa]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:ring-offset-2",
  ].join(" "),
  secondary: [
    "bg-[#000000] text-white",
    "hover:bg-[#333333]",
    "active:bg-[#1a1a1a]",
    "disabled:bg-[#e1e1e1] disabled:text-[#aaaaaa]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000] focus-visible:ring-offset-2",
  ].join(" "),
  accent: [
    "bg-[#c1e328] text-[#000000]",
    "hover:bg-[#a8c820]",
    "active:bg-[#8fad18]",
    "disabled:bg-[#e1e1e1] disabled:text-[#aaaaaa]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1e328] focus-visible:ring-offset-2",
  ].join(" "),
  outline: [
    "bg-white text-[#000000] border border-[#c8c8c8]",
    "hover:bg-[#f7f7f7] hover:border-[#777777]",
    "active:bg-[#e1e1e1]",
    "disabled:bg-white disabled:text-[#aaaaaa] disabled:border-[#e1e1e1]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:ring-offset-2",
  ].join(" "),
  ghost: [
    "bg-transparent text-[#000000]",
    "hover:bg-[#f7f7f7]",
    "active:bg-[#e1e1e1]",
    "disabled:text-[#aaaaaa]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:ring-offset-2",
  ].join(" "),
  destructive: [
    "bg-[#ef4444] text-white",
    "hover:bg-[#dc2626]",
    "active:bg-[#b91c1c]",
    "disabled:bg-[#e1e1e1] disabled:text-[#aaaaaa]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444] focus-visible:ring-offset-2",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-[14px] gap-1.5 rounded-[8px]",
  md: "h-11 px-4 text-[15px] gap-2 rounded-[10px]",
  lg: "h-[52px] px-5 text-[16px] gap-2 rounded-[12px]",
};

const Spinner = ({ size }: { size: ButtonSize }) => {
  const dims = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <svg
      className={`${dims} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          "inline-flex items-center justify-center font-semibold transition-colors duration-150 cursor-pointer select-none whitespace-nowrap",
          "disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <Spinner size={size} />
        ) : leftIcon ? (
          <span aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
