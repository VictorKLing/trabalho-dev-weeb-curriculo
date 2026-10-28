"use client";

import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resumeSchema, type ResumeFormValues } from "@/schemas/resume-schema";

const listHref = "/sistema/paginas/curriculos";

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
};

function getFirstError(errors: FieldErrors<ResumeFormValues>) {
  for (const error of Object.values(errors)) {
    if (error?.message) return error.message;
  }

  return "Confira os campos obrigatórios.";
}

export function ResumeForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResumeFormValues>({
    resolver: yupResolver(resumeSchema),
    defaultValues,
    mode: "onSubmit",
  });

  async function onSubmit(values: ResumeFormValues) {
    try {
      const { createResumeId, upsertResume } = await import(
        "@/lib/resume-storage"
      );

      upsertResume({
        ...values,
        id: createResumeId(),
        photo: null,
        experiences: [],
        education: [],
        createdAt: new Date().toISOString(),
      });

      toast.success("Currículo cadastrado com sucesso.");
      router.push(listHref);
    } catch {
      toast.error("Não foi possível salvar o currículo.");
    }
  }

  function onInvalid(formErrors: FieldErrors<ResumeFormValues>) {
    toast.error("Revise os campos do formulário.", {
      description: getFirstError(formErrors),
    });
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Novo perfil</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
          Cadastrar currículo
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Preencha as informações profissionais para criar um perfil completo e
          fácil de consultar.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="rounded-2xl border border-border/80 bg-card shadow-sm"
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

            <FormField
              id="phone"
              label="Telefone"
              required
              error={errors.phone?.message}
            >
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(00) 00000-0000"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="h-11 rounded-xl bg-background px-3"
                {...register("phone")}
              />
            </FormField>

            <FormField id="cpf" label="CPF" required error={errors.cpf?.message}>
              <Input
                id="cpf"
                inputMode="numeric"
                autoComplete="off"
                placeholder="000.000.000-00"
                aria-invalid={Boolean(errors.cpf)}
                aria-describedby={errors.cpf ? "cpf-error" : undefined}
                className="h-11 rounded-xl bg-background px-3"
                {...register("cpf")}
              />
            </FormField>

            <FormField
              id="birthDate"
              label="Data de nascimento"
              required
              error={errors.birthDate?.message}
            >
              <Input
                id="birthDate"
                type="date"
                autoComplete="bday"
                aria-invalid={Boolean(errors.birthDate)}
                aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                className="h-11 rounded-xl bg-background px-3"
                {...register("birthDate")}
              />
            </FormField>

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
                <textarea
                  id="summary"
                  rows={5}
                  placeholder="Apresente a trajetória, as principais competências e os objetivos profissionais."
                  aria-invalid={Boolean(errors.summary)}
                  aria-describedby={errors.summary ? "summary-error" : undefined}
                  className="w-full resize-y rounded-xl border border-input bg-background px-3 py-2.5 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                  {...register("summary")}
                />
              </FormField>
            </div>
          </div>
        </section>

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
            disabled={isSubmitting}
            className="h-11 rounded-xl px-5"
          >
            {isSubmitting ? "Salvando..." : "Salvar currículo"}
          </Button>
        </div>
      </form>
    </main>
  );
}
