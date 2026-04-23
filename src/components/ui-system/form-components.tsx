import * as React from "react";
import { cn } from "./utils";

export function FormSection({ title, description, children }: React.PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <section className="border-b border-slate-200 py-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function FieldRow({ label, hint, error, children }: React.PropsWithChildren<{ label: string; hint?: string; error?: string }>) {
  return (
    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:items-start">
      <div>
        <label className="text-sm font-medium">{label}</label>
        {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      </div>
      <div>
        {children}
        {error ? <InlineValidationMessage message={error} /> : null}
      </div>
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };
export function TextInput({ className, ...props }: InputProps) {
  return <input {...props} className={cn("h-9 w-full rounded border border-slate-300 px-3 text-sm", className)} />;
}

export function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("min-h-24 w-full rounded border border-slate-300 px-3 py-2 text-sm", className)} />;
}

export function SelectField({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn("h-9 w-full rounded border border-slate-300 px-3 text-sm", className)}>
      {children}
    </select>
  );
}

export function MultiSelectField({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} multiple className={cn("min-h-24 w-full rounded border border-slate-300 px-3 py-2 text-sm", className)}>
      {children}
    </select>
  );
}

export function ToggleField({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function RadioGroupField({
  options,
  value,
  onChange,
}: {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-4">
      {options.map((o) => (
        <label key={o.value} className="inline-flex items-center gap-2 text-sm">
          <input type="radio" checked={value === o.value} onChange={() => onChange(o.value)} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

export function CheckboxField({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function InlineValidationMessage({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function StickyFormFooter({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <footer className={cn("sticky bottom-0 z-10 border-t border-slate-200 bg-white px-6 py-3", className)}>{children}</footer>;
}
