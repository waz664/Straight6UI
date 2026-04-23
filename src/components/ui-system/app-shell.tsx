import * as React from "react";
import { cn } from "./utils";

export function AppShell({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("min-h-screen bg-slate-50 text-slate-900", className)}>{children}</div>;
}

export function SidebarNav({ children, collapsed, className }: React.PropsWithChildren<{ collapsed?: boolean; className?: string }>) {
  return (
    <aside
      className={cn(
        "border-r border-slate-200 bg-white",
        collapsed ? "w-16" : "w-64",
        "transition-all",
        className,
      )}
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
}

export function TopBar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <header className={cn("h-14 border-b border-slate-200 bg-white px-4", className)}>{children}</header>;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4", className)}>
      <div>
        <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function ContentToolbar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-6 py-3", className)}>{children}</div>;
}

export function DetailPanel({ open, children, className }: React.PropsWithChildren<{ open: boolean; className?: string }>) {
  if (!open) return null;
  return (
    <aside className={cn("w-[420px] border-l border-slate-200 bg-white", className)} aria-label="Detail panel">
      {children}
    </aside>
  );
}

export function DrawerPanel({
  open,
  onClose,
  title,
  children,
  className,
}: React.PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
  title?: string;
  className?: string;
}>) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" role="dialog" aria-modal="true">
      <section className={cn("h-full w-full max-w-2xl bg-white shadow-xl", className)}>
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-base font-semibold">{title ?? "Panel"}</h2>
          <button className="rounded border border-slate-300 px-2 py-1 text-sm" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="h-[calc(100%-49px)] overflow-auto p-4">{children}</div>
      </section>
    </div>
  );
}
