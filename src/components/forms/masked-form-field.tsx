"use client";

import { Controller, useFormContext, type FieldPathByValue } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { FormField } from "@/components/forms/form-field";
import type { ResumeFormValues } from "@/schemas/resume-schema";

interface MaskedFormFieldProps {
  name: FieldPathByValue<ResumeFormValues, string>;
  id: string;
  label: string;
  mask: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

export function MaskedFormField({
  name,
  id,
  label,
  mask,
  error,
  required = true,
  autoComplete,
}: MaskedFormFieldProps) {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <FormField id={id} label={label} required={required} error={error}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputMask
            id={id}
            name={field.name}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            mask={mask}
            replacement={{ _: /\d/ }}
            inputMode="numeric"
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
          />
        )}
      />
    </FormField>
  );
}
