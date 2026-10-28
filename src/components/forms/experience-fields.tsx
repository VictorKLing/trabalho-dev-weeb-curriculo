"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField } from "@/components/forms/form-field";
import { MaskedFormField } from "@/components/forms/masked-form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeFormValues } from "@/schemas/resume-schema";

function createExperienceId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `experience-${Date.now()}`;
}

export function ExperienceFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <section className="border-b border-border/70 p-5 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Experiência profissional
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Adicione uma ou mais experiências. Cada registro pode ser removido.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              id: createExperienceId(),
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="h-10 shrink-0 gap-2 rounded-xl px-3"
        >
          <Plus aria-hidden="true" className="size-4" />
          Adicionar experiência
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          Nenhuma experiência adicionada.
        </p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => {
            const rowErrors = errors.experiences?.[index];
            const companyId = `experience-${field.id}-company`;
            const positionId = `experience-${field.id}-position`;
            const startDateId = `experience-${field.id}-start`;
            const endDateId = `experience-${field.id}-end`;
            const descriptionId = `experience-${field.id}-description`;

            return (
              <div
                key={field.id}
                className="rounded-2xl border border-border/80 bg-background/70 p-4 sm:p-5"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Experiência {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="gap-1.5 text-muted-foreground hover:text-destructive"
                    aria-label={`Remover experiência ${index + 1}`}
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Remover
                  </Button>
                </div>

                <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <FormField
                    id={companyId}
                    label="Empresa"
                    required
                    error={rowErrors?.company?.message}
                  >
                    <Input
                      id={companyId}
                      autoComplete="organization"
                      aria-invalid={Boolean(rowErrors?.company)}
                      aria-describedby={
                        rowErrors?.company ? `${companyId}-error` : undefined
                      }
                      className="h-11 rounded-xl bg-card px-3"
                      {...register(`experiences.${index}.company` as const)}
                    />
                  </FormField>

                  <FormField
                    id={positionId}
                    label="Cargo"
                    required
                    error={rowErrors?.position?.message}
                  >
                    <Input
                      id={positionId}
                      aria-invalid={Boolean(rowErrors?.position)}
                      aria-describedby={
                        rowErrors?.position ? `${positionId}-error` : undefined
                      }
                      className="h-11 rounded-xl bg-card px-3"
                      {...register(`experiences.${index}.position` as const)}
                    />
                  </FormField>

                  <MaskedFormField
                    name={`experiences.${index}.startDate` as const}
                    id={startDateId}
                    label="Data de início"
                    mask="__/__/____"
                    error={rowErrors?.startDate?.message}
                  />

                  <MaskedFormField
                    name={`experiences.${index}.endDate` as const}
                    id={endDateId}
                    label="Data de término (opcional)"
                    mask="__/__/____"
                    error={rowErrors?.endDate?.message}
                    required={false}
                  />

                  <div className="sm:col-span-2">
                    <FormField
                      id={descriptionId}
                      label="Atividades e resultados"
                      required
                      error={rowErrors?.description?.message}
                    >
                      <Textarea
                        id={descriptionId}
                        rows={3}
                        aria-invalid={Boolean(rowErrors?.description)}
                        aria-describedby={
                          rowErrors?.description
                            ? `${descriptionId}-error`
                            : undefined
                        }
                        className="resize-y rounded-xl bg-card px-3 py-2.5 leading-6"
                        {...register(
                          `experiences.${index}.description` as const,
                        )}
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
