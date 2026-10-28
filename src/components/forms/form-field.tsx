import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  error,
  required = false,
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="grid content-start gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-primary">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
