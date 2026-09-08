import React, { useState } from "react";
import Badge, { BadgeVariant } from "./Badge";

export interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  rowKey?: keyof T | ((row: T) => string);
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  density?: "default" | "compact";
  className?: string;
}

const SortIcon = ({ direction }: { direction?: "asc" | "desc" | null }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="ml-1 inline-block">
    <path
      d="M6 2v8M3 5l3-3 3 3M3 7l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={direction === "asc" ? "opacity-100" : "opacity-30"}
    />
  </svg>
);

const Checkbox: React.FC<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}> = ({ checked, indeterminate, onChange, label }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={label}
      className="w-4 h-4 rounded-[4px] border-[#c8c8c8] accent-[#a20eff] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#a20eff] focus-visible:outline-none"
    />
  );
};

const EmptyState: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => (
  <tr>
    <td colSpan={99} className="py-16 px-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#f7f7f7] border border-[#e1e1e1] flex items-center justify-center mb-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="14" height="12" rx="2" stroke="#aaaaaa" strokeWidth="1.5" />
            <path d="M7 5V4a3 3 0 016 0v1" stroke="#aaaaaa" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 10h6M7 13h4" stroke="#aaaaaa" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[15px] font-semibold text-[#000000]">{title}</p>
        {description && (
          <p className="text-[14px] text-[#777777] max-w-sm">{description}</p>
        )}
      </div>
    </td>
  </tr>
);

const LoadingRows: React.FC<{ columns: number; rows?: number }> = ({ columns, rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} className="border-b border-[#e1e1e1]">
        {Array.from({ length: columns }).map((_, j) => (
          <td key={j} className="px-4 py-3">
            <div
              className="h-4 rounded-[4px] bg-[#f7f7f7] animate-pulse"
              style={{ width: j === 0 ? "60%" : j % 3 === 0 ? "40%" : "80%" }}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedKeys = new Set(),
  onSelectionChange,
  onRowClick,
  loading = false,
  emptyStateTitle = "No records found",
  emptyStateDescription,
  density = "default",
  className = "",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const getRowKey = (row: T, index: number): string => {
    if (!rowKey) return String(index);
    if (typeof rowKey === "function") return rowKey(row);
    return String(row[rowKey]);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const allSelected = data.length > 0 && data.every((row, i) => selectedKeys.has(getRowKey(row, i)));
  const someSelected = data.some((row, i) => selectedKeys.has(getRowKey(row, i)));

  const handleSelectAll = (checked: boolean) => {
    const newKeys = new Set(selectedKeys);
    data.forEach((row, i) => {
      const key = getRowKey(row, i);
      checked ? newKeys.add(key) : newKeys.delete(key);
    });
    onSelectionChange?.(newKeys);
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    const newKeys = new Set(selectedKeys);
    checked ? newKeys.add(key) : newKeys.delete(key);
    onSelectionChange?.(newKeys);
  };

  const cellPadding = density === "compact" ? "px-4 py-2.5" : "px-4 py-3.5";

  return (
    <div className={["w-full overflow-x-auto rounded-[16px] border border-[#e1e1e1] shadow-[0_1px_2px_rgba(0,0,0,0.06)]", className].join(" ")}>
      <table className="w-full border-collapse" role="grid">
        <thead>
          <tr className="bg-[#f7f7f7] border-b border-[#e1e1e1]">
            {selectable && (
              <th scope="col" className="px-4 py-3 w-10">
                <Checkbox
                  checked={allSelected}
                  indeterminate={!allSelected && someSelected}
                  onChange={handleSelectAll}
                  label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={[
                  "text-[11px] font-bold uppercase tracking-[0.08em] text-[#777777] whitespace-nowrap",
                  col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left",
                  cellPadding,
                  col.sortable ? "cursor-pointer select-none hover:text-[#000000] transition-colors" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={
                  col.sortable
                    ? sortKey === col.key
                      ? sortDir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                    : undefined
                }
              >
                {col.label}
                {col.sortable && <SortIcon direction={sortKey === col.key ? sortDir : null} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingRows columns={columns.length + (selectable ? 1 : 0)} />
          ) : data.length === 0 ? (
            <EmptyState title={emptyStateTitle} description={emptyStateDescription} />
          ) : (
            data.map((row, rowIndex) => {
              const key = getRowKey(row, rowIndex);
              const isSelected = selectedKeys.has(key);
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  aria-selected={selectable ? isSelected : undefined}
                  className={[
                    "border-b border-[#e1e1e1] last:border-b-0 transition-colors",
                    onRowClick ? "cursor-pointer" : "",
                    isSelected
                      ? "bg-[#f5e6ff]"
                      : onRowClick
                      ? "hover:bg-[#fafafa]"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={(checked) => handleSelectRow(key, checked)}
                        label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={[
                        "text-[14px] text-[#333333] whitespace-nowrap",
                        col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left",
                        cellPadding,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
