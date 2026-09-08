import React, { useState } from "react";

export type TabsVariant = "underline" | "pill" | "segmented";

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: TabsVariant;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  className = "",
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? "");
  const active = activeTab ?? internalActive;

  const handleChange = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  if (variant === "underline") {
    return (
      <div className={["border-b border-[#e1e1e1]", className].join(" ")}>
        <nav role="tablist" aria-label="Tabs" className="flex gap-0 -mb-px">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && handleChange(tab.id)}
                className={[
                  "flex items-center gap-2 px-4 py-3 text-[14px] font-semibold border-b-2 transition-colors whitespace-nowrap",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:ring-inset",
                  isActive
                    ? "border-[#a20eff] text-[#a20eff]"
                    : "border-transparent text-[#777777] hover:text-[#000000] hover:border-[#c8c8c8]",
                  tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
                {tab.label}
                {tab.badge != null && (
                  <span className="text-[11px] font-semibold bg-[#f7f7f7] border border-[#e1e1e1] text-[#777777] px-1.5 py-0.5 rounded-full leading-none">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <nav role="tablist" aria-label="Tabs" className={["flex gap-1", className].join(" ")}>
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              className={[
                "flex items-center gap-2 px-4 py-2 text-[14px] font-semibold rounded-full transition-colors whitespace-nowrap",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:ring-offset-2",
                isActive
                  ? "bg-[#a20eff] text-white"
                  : "text-[#777777] hover:text-[#000000] hover:bg-[#f7f7f7]",
                tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
              {tab.label}
              {tab.badge != null && (
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full leading-none ${
                    isActive ? "bg-white/20 text-white" : "bg-[#e1e1e1] text-[#555555]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  // segmented
  return (
    <div
      role="tablist"
      aria-label="Tabs"
      className={[
        "inline-flex p-1 bg-[#f7f7f7] border border-[#e1e1e1] rounded-[12px] gap-0.5",
        className,
      ].join(" ")}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleChange(tab.id)}
            className={[
              "flex items-center gap-2 px-4 py-1.5 text-[14px] font-semibold rounded-[9px] transition-all whitespace-nowrap",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff]",
              isActive
                ? "bg-white text-[#000000] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                : "text-[#777777] hover:text-[#000000]",
              tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
