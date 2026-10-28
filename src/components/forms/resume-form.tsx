"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import {
  FormProvider,
  useWatch,
  useForm,
  type FieldErrors,
} from "react-hook-form";
import { toast } from "sonner";
import { EducationFields } from "@/components/forms/education-fields";
import { ExperienceFields } from "@/components/forms/experience-fields";
import { FormField } from "@/components/forms/form-field";
import { ImageUploadField } from "@/components/forms/image-upload-field";
import { MaskedFormField } from "@/components/forms/masked-form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { resumeSchema, type ResumeFormValues } from "@/schemas/resume-schema";
import type { Resume } from "@/types/resume";

const listHref = "/curriculos/visualizar";

const defaultValues: ResumeFormValues = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  cpf: "",
  birthDate: "",
  city: "",
  state: "",
  summary: "",
  photo: null,
  experiences: [],
  education: [],
};

function toFormDate(value: string | null) {
  if (!value) return "";

  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function toStoredDate(value: string) {
  const [day, month, year] = value.split("/");
  return `${year}-${month}-${day}`;
}

function findErrorMessage(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  if ("message" in value && typeof value.message === "string") {
    return value.message;
  }

  return Object.values(value)
    .map(findErrorMessage)
    .find((message): message is string => Boolean(message));
}

function toFormValues(resume: Resume): ResumeFormValues {
  return {
    fullName: resume.fullName,
    jobTitle: resume.jobTitle,
    email: resume.email,
    phone: resume.phone,
    cpf: resume.cpf,
    birthDate: toFormDate(resume.birthDate),
    city: resume.city,
    state: resume.state,
    summary: resume.summary,
    photo: resume.photo,
    experiences: resume.experiences.map((experience) => ({
      ...experience,
      startDate: toFormDate(experience.startDate),
      endDate: toFormDate(experience.endDate),
    })),
    education: resume.education.map((education) => ({
      ...education,
      startDate: toFormDate(education.startDate),
      endDate: toFormDate(education.endDate),
    })),
  };
}

function ResumeFormSkeleton() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-3 h-9 w-64 max-w-full" />
      <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      <div className="mt-8 space-y-5 rounded-2xl border border-border/80 bg-card p-5 sm:p-8">
        <Skeleton className="h-5 w-64 max-w-full" />
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="h-11 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-28 rounded-xl" />
      </div>
    </main>
  );
}

export function ResumeForm({ resumeId }: { resumeId?: string }) {
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState<string>();
  const [isLoadingExisting, setIsLoadingExisting] = useState(Boolean(resumeId));
  const form = useForm<ResumeFormValues>({
    resolver: yupResolver(resumeSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = form;
  const fullName = useWatch({ control: form.control, name: "fullName" });
  const photo = useWatch({ control: form.control, name: "photo" });

  useEffect(() => {
    if (!resumeId) return;

    let isCurrent = true;

    import("@/lib/resume-storage")
      .then(({ readResume }) => {
        const resume = readResume(resumeId);
        if (!isCurrent) return;

        if (!resume) {
          toast.error("O currículo solicitado não foi encontrado.");
          router.replace(listHref);
          return;
        }

        setCreatedAt(resume.createdAt);
        reset(toFormValues(resume));
      })
      .catch(() => {
        if (!isCurrent) return;
        toast.error("Não foi possível carregar este currículo.");
        router.replace(listHref);
      })
      .finally(() => {
        if (isCurrent) setIsLoadingExisting(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [resumeId, reset, router]);

  async function onSubmit(values: ResumeFormValues) {
    try {
      const { createResumeId, upsertResume } = await import(
        "@/lib/resume-storage"
      );
      const resume: Resume = {
        ...values,
        id: resumeId ?? createResumeId(),
        birthDate: toStoredDate(values.birthDate),
        photo: values.photo ?? null,
        experiences: values.experiences.map((experience) => ({
          ...experience,
          id: experience.id || createResumeId(),
          startDate: toStoredDate(experience.startDate),
          endDate: experience.endDate
            ? toStoredDate(experience.endDate)
            : null,
        })),
        education: values.education.map((education) => ({
          ...education,
          id: education.id || createResumeId(),
          startDate: toStoredDate(education.startDate),
          endDate: education.endDate ? toStoredDate(education.endDate) : null,
        })),
        createdAt: createdAt ?? new Date().toISOString(),
      };

      upsertResume(resume);
      toast.success(
        resumeId ? "Currículo atualizado com sucesso." : "Currículo cadastrado com sucesso.",
      );
      router.push(listHref);
    } catch {
      toast.error("Não foi possível salvar o currículo.");
    }
  }

  function onInvalid(formErrors: FieldErrors<ResumeFormValues>) {
    toast.error("Revise os campos do formulário.", {
      description:
        findErrorMessage(formErrors) ?? "Confira os campos obrigatórios.",
    });
  }

  if (isLoadingExisting) return <ResumeFormSkeleton />;

  const isEditing = Boolean(resumeId);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href={listHref}
        className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Voltar para currículos
      </Link>

      <div className="mb-8 mt-6">
        <p className="text-sm font-semibold text-primary">
          {isEditing ? "Atualizar perfil" : "Novo perfil"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
          {isEditing ? "Editar currículo" : "Cadastrar currículo"}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          {isEditing
            ? "Revise os dados profissionais e atualize a trajetória deste perfil."
            : "Preencha as informações profissionais para criar um perfil completo e fácil de consultar."}
        </p>
      </div>

      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
        >
          <section className="border-b border-border/70 p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Informações pessoais e profissionais
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Os campos marcados com * são obrigatórios.
              </p>
            </div>

            <div className="mb-6">
              <ImageUploadField
                fullName={fullName}
                photo={photo}
                onPhotoChange={(photo) =>
                  setValue("photo", photo, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </div>

            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              <FormField
                id="fullName"
                label="Nome completo"
                required
                error={errors.fullName?.message}
              >
                <Input
                  id="fullName"
                  autoComplete="name"
                  placeholder="Ex.: Mariana Costa"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className="h-11 rounded-xl bg-background px-3"
                  {...register("fullName")}
                />
              </FormField>

              <FormField
                id="jobTitle"
                label="Cargo desejado"
                required
                error={errors.jobTitle?.message}
              >
                <Input
                  id="jobTitle"
                  placeholder="Ex.: Product Designer"
                  aria-invalid={Boolean(errors.jobTitle)}
                  aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
                  className="h-11 rounded-xl bg-background px-3"
                  {...register("jobTitle")}
                />
              </FormField>

              <FormField
                id="email"
                label="E-mail"
                required
                error={errors.email?.message}
              >
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nome@exemplo.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="h-11 rounded-xl bg-background px-3"
                  {...register("email")}
                />
              </FormField>

              <MaskedFormField
                name="phone"
                id="phone"
                label="Telefone"
                mask="(__) _____-____"
                error={errors.phone?.message}
                autoComplete="tel"
              />

              <MaskedFormField
                name="cpf"
                id="cpf"
                label="CPF"
                mask="___.___.___-__"
                error={errors.cpf?.message}
              />

              <MaskedFormField
                name="birthDate"
                id="birthDate"
                label="Data de nascimento"
                mask="__/__/____"
                error={errors.birthDate?.message}
                autoComplete="bday"
              />

              <FormField
                id="city"
                label="Cidade"
                required
                error={errors.city?.message}
              >
                <Input
                  id="city"
                  autoComplete="address-level2"
                  placeholder="Ex.: São Paulo"
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  className="h-11 rounded-xl bg-background px-3"
                  {...register("city")}
                />
              </FormField>

              <FormField
                id="state"
                label="Estado (UF)"
                required
                error={errors.state?.message}
              >
                <Input
                  id="state"
                  autoComplete="address-level1"
                  maxLength={2}
                  placeholder="SP"
                  aria-invalid={Boolean(errors.state)}
                  aria-describedby={errors.state ? "state-error" : undefined}
                  className="h-11 rounded-xl bg-background px-3 uppercase"
                  {...register("state")}
                />
              </FormField>

              <div className="sm:col-span-2">
                <FormField
                  id="summary"
                  label="Resumo profissional"
                  required
                  error={errors.summary?.message}
                >
                  <Textarea
                    id="summary"
                    rows={5}
                    placeholder="Apresente a trajetória, as principais competências e os objetivos profissionais."
                    aria-invalid={Boolean(errors.summary)}
                    aria-describedby={errors.summary ? "summary-error" : undefined}
                    className="resize-y rounded-xl bg-background px-3 py-2.5 leading-6"
                    {...register("summary")}
                  />
                </FormField>
              </div>
            </div>
          </section>

          <ExperienceFields />
          <EducationFields />

          <div className="flex flex-col-reverse gap-3 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-11 rounded-xl px-5"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="h-11 rounded-xl px-5"
            >
              {isSubmitting
                ? "Salvando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Salvar currículo"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
