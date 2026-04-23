import * as React from "react";
import { cn } from "./utils";

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "success" | "warning" | "error" | "info" }) {
  const toneClass = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  }[tone];

  return <span className={cn("inline-flex rounded px-2 py-0.5 text-xs font-medium", toneClass)}>{label}</span>;
}

export function SectionHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function MetricTile({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
      {delta ? <p className="mt-1 text-xs text-slate-600">{delta}</p> : null}
    </div>
  );
}

export function SearchCommandBar({ value, onChange, placeholder = "Search" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="flex h-9 w-full max-w-md items-center rounded border border-slate-300 bg-white px-3">
      <span className="mr-2 text-xs text-slate-500">⌘K</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm outline-none"
        aria-label={placeholder}
      />
    </div>
  );
}
