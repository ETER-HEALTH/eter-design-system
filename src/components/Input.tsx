import React from "react";

export type InputVariant = "default" | "error" | "success" | "disabled";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  errorText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

const inputVariantStyles: Record<InputVariant, string> = {
  default: [
    "border-[#e1e1e1] bg-white text-[#000000]",
    "hover:border-[#c8c8c8]",
    "focus:border-[#a20eff] focus:ring-2 focus:ring-[#a20eff] focus:ring-offset-0",
  ].join(" "),
  error: [
    "border-[#ef4444] bg-white text-[#000000]",
    "focus:border-[#ef4444] focus:ring-2 focus:ring-[#ef4444] focus:ring-offset-0",
  ].join(" "),
  success: [
    "border-[#22c55e] bg-white text-[#000000]",
    "focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-0",
  ].join(" "),
  disabled: "border-[#e1e1e1] bg-[#f7f7f7] text-[#aaaaaa] cursor-not-allowed",
};

const inputSizeStyles = {
  sm: "h-9 px-3 text-[14px]",
  md: "h-11 px-3.5 text-[15px]",
  lg: "h-[52px] px-4 text-[16px]",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      label,
      helperText,
      errorText,
      leftAddon,
      rightAddon,
      inputSize = "md",
      disabled,
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const helperTextId = inputId ? `${inputId}-helper` : undefined;
    const errorTextId = inputId ? `${inputId}-error` : undefined;
    const resolvedVariant: InputVariant = disabled ? "disabled" : variant;
    const hasError = variant === "error" || !!errorText;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[14px] leading-[20px] font-semibold text-[#000000]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[#777777]">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              errorText ? errorTextId : helperText ? helperTextId : undefined
            }
            className={[
              "w-full rounded-[10px] border outline-none transition-colors duration-150",
              "placeholder:text-[#aaaaaa]",
              "focus:outline-none",
              inputVariantStyles[resolvedVariant],
              inputSizeStyles[inputSize],
              leftAddon ? "pl-9" : "",
              rightAddon ? "pr-9" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-[#777777]">
              {rightAddon}
            </div>
          )}
        </div>
        {errorText ? (
          <p id={errorTextId} role="alert" className="text-[12px] leading-[16px] text-[#dc2626]">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="text-[12px] leading-[16px] text-[#777777]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

// ─── Select ─────────────────────────────────────────────

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  errorText?: string;
  inputSize?: "sm" | "md" | "lg";
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "default",
      label,
      helperText,
      errorText,
      inputSize = "md",
      disabled,
      id,
      options,
      placeholder,
      className = "",
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const helperTextId = selectId ? `${selectId}-helper` : undefined;
    const errorTextId = selectId ? `${selectId}-error` : undefined;
    const resolvedVariant: InputVariant = disabled ? "disabled" : variant;
    const hasError = variant === "error" || !!errorText;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[14px] leading-[20px] font-semibold text-[#000000]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              errorText ? errorTextId : helperText ? helperTextId : undefined
            }
            className={[
              "w-full rounded-[10px] border outline-none transition-colors duration-150 appearance-none pr-10",
              "focus:outline-none",
              inputVariantStyles[resolvedVariant],
              inputSizeStyles[inputSize],
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#777777]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {errorText ? (
          <p id={errorTextId} role="alert" className="text-[12px] leading-[16px] text-[#dc2626]">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="text-[12px] leading-[16px] text-[#777777]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";

// ─── Textarea ────────────────────────────────────────────

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  errorText?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      label,
      helperText,
      errorText,
      disabled,
      id,
      resize = "vertical",
      className = "",
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const helperTextId = textareaId ? `${textareaId}-helper` : undefined;
    const errorTextId = textareaId ? `${textareaId}-error` : undefined;
    const resolvedVariant: InputVariant = disabled ? "disabled" : variant;
    const hasError = variant === "error" || !!errorText;

    const resizeClass = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    }[resize];

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[14px] leading-[20px] font-semibold text-[#000000]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            errorText ? errorTextId : helperText ? helperTextId : undefined
          }
          className={[
            "w-full rounded-[10px] border outline-none transition-colors duration-150 px-3.5 py-3",
            "placeholder:text-[#aaaaaa]",
            "focus:outline-none min-h-[120px]",
            inputVariantStyles[resolvedVariant],
            resizeClass,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {errorText ? (
          <p id={errorTextId} role="alert" className="text-[12px] leading-[16px] text-[#dc2626]">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="text-[12px] leading-[16px] text-[#777777]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Input;
