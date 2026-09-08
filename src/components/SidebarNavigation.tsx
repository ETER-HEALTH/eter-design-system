import React, { useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  isNew?: boolean;
  isAI?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface SidebarNavigationProps {
  groups: NavGroup[];
  activeItemId?: string;
  onItemClick?: (item: NavItem) => void;
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const UserAvatar: React.FC<{ name: string; avatarUrl?: string }> = ({ name, avatarUrl }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover border border-[#e1e1e1]"
      />
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-[#f5e6ff] border border-[#d199ff] flex items-center justify-center flex-shrink-0">
      <span className="text-[12px] font-semibold text-[#a20eff]">{initials}</span>
    </div>
  );
};

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  groups,
  activeItemId,
  onItemClick,
  user,
  collapsed = false,
  onToggleCollapse,
  className = "",
}) => {
  const handleItemClick = (item: NavItem) => {
    item.onClick?.();
    onItemClick?.(item);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={[
        "flex flex-col h-full bg-white border-r border-[#e1e1e1]",
        "transition-all duration-200",
        collapsed ? "w-[64px]" : "w-[240px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[#e1e1e1] flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-1.5">
            <span className="text-[22px] font-bold tracking-[-0.04em] text-[#000000] leading-none">
              ETER
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#a20eff] mb-0.5"
              aria-hidden="true"
            />
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="text-[18px] font-bold text-[#000000] leading-none">E</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#a20eff] mt-1 ml-0.5 flex-shrink-0" aria-hidden="true" />
          </div>
        )}
        {!collapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="p-1 rounded-[6px] text-[#777777] hover:bg-[#f7f7f7] hover:text-[#000000] transition-colors focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:outline-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className={groupIndex > 0 ? "mt-4" : ""}>
            {group.label && !collapsed && (
              <div className="px-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#aaaaaa]">
                  {group.label}
                </span>
              </div>
            )}
            <ul role="list" className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.id === activeItemId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      aria-current={isActive ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                      className={[
                        "w-full flex items-center rounded-[10px] transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff]",
                        collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
                        isActive
                          ? "bg-[#f5e6ff] text-[#a20eff]"
                          : "text-[#333333] hover:bg-[#f7f7f7] hover:text-[#000000]",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span
                        className={`flex-shrink-0 ${isActive ? "text-[#a20eff]" : "text-[#777777]"}`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left text-[14px] font-medium leading-[20px] truncate">
                            {item.label}
                          </span>

                          <span className="flex items-center gap-1.5 flex-shrink-0">
                            {item.isAI && (
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#c1e328]"
                                aria-label="AI feature"
                              />
                            )}
                            {item.isNew && (
                              <span className="text-[10px] font-bold uppercase tracking-wide bg-[#c1e328] text-[#000000] px-1.5 py-0.5 rounded-full leading-none">
                                New
                              </span>
                            )}
                            {item.badge != null && (
                              <span className="text-[11px] font-semibold bg-[#f7f7f7] text-[#777777] border border-[#e1e1e1] px-1.5 py-0.5 rounded-full leading-none min-w-[20px] text-center">
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* User profile */}
      {user && (
        <div className="border-t border-[#e1e1e1] p-3 flex-shrink-0">
          <button
            className={[
              "w-full rounded-[10px] hover:bg-[#f7f7f7] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff]",
              collapsed ? "flex justify-center p-2" : "flex items-center gap-3 p-2",
            ].join(" ")}
            aria-label={`User profile: ${user.name}`}
          >
            <UserAvatar name={user.name} avatarUrl={user.avatarUrl} />
            {!collapsed && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-[14px] font-semibold text-[#000000] truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-[12px] text-[#777777] truncate leading-tight">{user.role}</p>
              </div>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default SidebarNavigation;
