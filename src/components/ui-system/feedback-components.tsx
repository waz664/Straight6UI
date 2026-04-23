import * as React from "react";
import { cn } from "./utils";

type CalloutProps = React.PropsWithChildren<{ title: string; className?: string }>;

function CalloutBase({ title, className, children }: CalloutProps) {
  return (
    <div className={cn("rounded border px-4 py-3 text-sm", className)} role="status">
      <p className="font-semibold">{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function InfoCallout(props: CalloutProps) {
  return <CalloutBase {...props} className={cn("border-blue-200 bg-blue-50 text-blue-900", props.className)} />;
}

export function WarningCallout(props: CalloutProps) {
  return <CalloutBase {...props} className={cn("border-amber-200 bg-amber-50 text-amber-900", props.className)} />;
}

export function ErrorCallout(props: CalloutProps) {
  return <CalloutBase {...props} className={cn("border-red-200 bg-red-50 text-red-900", props.className)} />;
}

export function SuccessCallout(props: CalloutProps) {
  return <CalloutBase {...props} className={cn("border-emerald-200 bg-emerald-50 text-emerald-900", props.className)} />;
}

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-md rounded border border-slate-200 bg-white p-4 shadow-lg">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded border border-slate-300 px-3 py-1.5 text-sm" onClick={onCancel}>
            Cancel
          </button>
          <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export function ToastNotification({ message }: { message: string }) {
  return <div className="fixed bottom-4 right-4 rounded border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white">{message}</div>;
}
