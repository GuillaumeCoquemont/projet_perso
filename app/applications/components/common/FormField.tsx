import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
}>;

export default function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  className = "",
  children,
}: Props) {
  const describedBy = [
    hint ? `${htmlFor || ""}-hint` : undefined,
    error ? `${htmlFor || ""}-error` : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </label>

      <div aria-describedby={describedBy}>{children}</div>

      {hint ? (
        <p id={`${htmlFor || ""}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${htmlFor || ""}-error`}
          className="text-xs text-red-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
