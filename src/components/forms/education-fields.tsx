"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField } from "@/components/forms/form-field";
import { MaskedFormField } from "@/components/forms/masked-form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeFormValues } from "@/schemas/resume-schema";

function createEducationId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `education-${Date.now()}`;
}

export function EducationFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section className="border-b border-border/70 p-5 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Formação acadêmica
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Inclua cursos, níveis de formação e períodos de estudo.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              id: createEducationId(),
              institution: "",
              course: "",
              degree: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="h-10 shrink-0 gap-2 rounded-xl px-3"
        >
          <Plus aria-hidden="true" className="size-4" />
          Adicionar formação
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          Nenhuma formação adicionada.
        </p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => {
            const rowErrors = errors.education?.[index];
            const institutionId = `education-${field.id}-institution`;
            const courseId = `education-${field.id}-course`;
            const degreeId = `education-${field.id}-degree`;
            const startDateId = `education-${field.id}-start`;
            const endDateId = `education-${field.id}-end`;
            const descriptionId = `education-${field.id}-description`;

            return (
              <div
                key={field.id}
                className="rounded-2xl border border-border/80 bg-background/70 p-4 sm:p-5"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Formação {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="gap-1.5 text-muted-foreground hover:text-destructive"
                    aria-label={`Remover formação ${index + 1}`}
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Remover
                  </Button>
                </div>

                <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <FormField
                    id={institutionId}
                    label="Instituição"
                    required
                    error={rowErrors?.institution?.message}
                  >
                    <Input
                      id={institutionId}
                      autoComplete="organization"
                      aria-invalid={Boolean(rowErrors?.institution)}
                      aria-describedby={
                        rowErrors?.institution
                          ? `${institutionId}-error`
                          : undefined
                      }
                      className="h-11 rounded-xl bg-card px-3"
                      {...register(`education.${index}.institution` as const)}
                    />
                  </FormField>

                  <FormField
                    id={courseId}
                    label="Curso"
                    required
                    error={rowErrors?.course?.message}
                  >
                    <Input
                      id={courseId}
                      aria-invalid={Boolean(rowErrors?.course)}
                      aria-describedby={
                        rowErrors?.course ? `${courseId}-error` : undefined
                      }
                      className="h-11 rounded-xl bg-card px-3"
                      {...register(`education.${index}.course` as const)}
                    />
                  </FormField>

                  <FormField
                    id={degreeId}
                    label="Nível de formação"
                    required
                    error={rowErrors?.degree?.message}
                  >
                    <Input
                      id={degreeId}
                      placeholder="Ex.: Bacharelado"
                      aria-invalid={Boolean(rowErrors?.degree)}
                      aria-describedby={
                        rowErrors?.degree ? `${degreeId}-error` : undefined
                      }
                      className="h-11 rounded-xl bg-card px-3"
                      {...register(`education.${index}.degree` as const)}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <MaskedFormField
                      name={`education.${index}.startDate` as const}
                      id={startDateId}
                      label="Início"
                      mask="__/__/____"
                      error={rowErrors?.startDate?.message}
                    />
                    <MaskedFormField
                      name={`education.${index}.endDate` as const}
                      id={endDateId}
                      label="Término"
                      mask="__/__/____"
                      error={rowErrors?.endDate?.message}
                      required={false}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      id={descriptionId}
                      label="Descrição (opcional)"
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
                        {...register(`education.${index}.description` as const)}
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
