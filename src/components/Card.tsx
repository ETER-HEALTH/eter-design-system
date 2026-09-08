import React from "react";

export type CardVariant = "default" | "elevated" | "clinical" | "insight" | "selected";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
  default: [
    "bg-white border border-[#e1e1e1] rounded-[16px]",
    "shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
  ].join(" "),
  elevated: [
    "bg-white border border-[#e1e1e1] rounded-[16px]",
    "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
  ].join(" "),
  clinical: [
    "bg-white border border-[#e1e1e1] rounded-[16px]",
    "shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
    "border-l-4 border-l-[#a20eff]",
  ].join(" "),
  insight: [
    "bg-white border border-[#e1e1e1] rounded-[16px]",
    "shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
    "border-t-2 border-t-[#c1e328]",
  ].join(" "),
  selected: [
    "bg-[#f5e6ff] border border-[#a20eff] rounded-[16px]",
    "shadow-[0_4px_12px_rgba(162,14,255,0.12)]",
  ].join(" "),
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      as: Component = "div",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={[variantStyles[variant], paddingStyles[padding], className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle: React.FC<CardTitleProps> = ({
  as: Tag = "h3",
  children,
  className = "",
  ...props
}) => (
  <Tag
    className={`text-[20px] leading-[28px] font-semibold text-[#000000] ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={`text-[14px] leading-[20px] text-[#777777] mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = "", ...props }) => (
  <div
    className={`mt-4 pt-4 border-t border-[#e1e1e1] flex items-center gap-3 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
