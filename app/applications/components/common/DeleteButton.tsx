"use client";

import { useFormStatus } from "react-dom";
import { useCallback, useActionState } from "react";

export type ActionState = { ok: boolean; error?: string };

export type ServerAction = (
  prev: ActionState,
  formData: FormData
) => Promise<ActionState> | ActionState;

type HiddenFields = Record<
  string,
  string | number | boolean | null | undefined
>;

type Props = {
  action: ServerAction;
  initial?: ActionState;
  fields: HiddenFields;
  confirmText?: string;
  label?: string;
  className?: string;
};

export default function DeleteButton({
  action,
  initial = { ok: false },
  fields,
  confirmText = "Supprimer définitivement ?",
  label = "Supprimer",
  className = "",
}: Props) {
  const [state, formAction] = useActionState(action, initial);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      // Why: ask before irreversible operation
      if (!confirmText) return;
      if (!window.confirm(confirmText)) {
        e.preventDefault();
      }
    },
    [confirmText]
  );

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      className="flex flex-col items-start"
    >
      {Object.entries(fields).map(([k, v]) =>
        v === undefined ? null : (
          <input key={k} type="hidden" name={k} value={String(v)} />
        )
      )}
      <Submit className={className}>{label}</Submit>
      {state?.error ? (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}

function Submit({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60 ${className}`}
      title="Supprimer définitivement"
    >
      {pending ? "Suppression…" : children}
    </button>
  );
}
