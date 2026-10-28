"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
  Mail,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { DeleteResumeButton } from "@/components/resumes/delete-resume-button";
import { ResumeAvatar } from "@/components/resumes/resume-avatar";
import { ResumeDetailsSkeleton } from "@/components/resumes/resume-details-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Resume } from "@/types/resume";

const listHref = "/curriculos/visualizar";
const createHref = "/curriculos/cadastrar";

function formatDate(value: string) {
  if (!value) return "Não informado";

  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
}

function formatMonth(value: string | null) {
  if (!value) return "Atual";

  const date = new Date(`${value.slice(0, 7)}-01T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function ResumeNotFound({ hasError = false }: { hasError?: boolean }) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-16 sm:px-6">
      <div className="w-full rounded-2xl border border-border/80 bg-card px-6 py-12 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
          <UserRound aria-hidden="true" className="size-5" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
          {hasError
            ? "Não foi possível carregar o currículo"
            : "Currículo não encontrado"}
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
          {hasError
            ? "Ocorreu um problema ao abrir este perfil. Tente novamente mais tarde."
            : "Este perfil pode ter sido removido ou ainda não foi cadastrado."}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href={listHref}>Voltar para currículos</Link>
          </Button>
          <Button asChild className="h-11 rounded-xl">
            <Link href={createHref}>Cadastrar currículo</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export function ResumeDetails({ id }: { id: string }) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setHasError(false);

    import("@/lib/resume-storage")
      .then(({ readResume }) => {
        if (isCurrent) setResume(readResume(id) ?? null);
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true);
          toast.error("Não foi possível carregar este currículo.");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  if (isLoading) return <ResumeDetailsSkeleton />;
  if (hasError) return <ResumeNotFound hasError />;
  if (!resume) return <ResumeNotFound />;

  const location = [resume.city, resume.state].filter(Boolean).join(", ");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href={listHref}
        className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Voltar para currículos
      </Link>

      <Card className="mt-6 gap-0 rounded-2xl border-border/80 bg-card py-0 shadow-sm">
        <CardContent className="p-5 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <ResumeAvatar
                fullName={resume.fullName}
                photo={resume.photo}
                size="lg"
              />
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
                  {resume.fullName}
                </h1>
                <p className="mt-1.5 text-base text-muted-foreground">
                  {resume.jobTitle}
                </p>
                {location && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="size-4" />
                    {location}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                variant="outline"
                className="h-11 gap-2 rounded-xl"
              >
                <Link href={`${createHref}?editar=${resume.id}`}>
                  <Pencil aria-hidden="true" className="size-4" />
                  Editar currículo
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 gap-2 rounded-xl"
              >
                <a href={`mailto:${resume.email}`}>
                  <Mail aria-hidden="true" className="size-4" />
                  Enviar e-mail
                </a>
              </Button>
              <DeleteResumeButton id={resume.id} fullName={resume.fullName} />
            </div>
          </div>

          <div className="mt-7 border-t border-border/70 pt-6">
            <div className="flex items-center gap-2">
              <UserRound aria-hidden="true" className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                Resumo profissional
              </h2>
            </div>
            <p className="mt-3 max-w-4xl whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {resume.summary || "Resumo profissional não informado."}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <Card className="gap-0 rounded-2xl border-border/80 bg-card py-0 shadow-sm">
          <CardContent className="p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <UserRound aria-hidden="true" className="size-4 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Informações pessoais
              </h2>
            </div>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  E-mail
                </dt>
                <dd className="mt-1 break-all text-sm text-foreground">
                  {resume.email || "Não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Telefone
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-sm text-foreground">
                  <Phone aria-hidden="true" className="size-4 text-muted-foreground" />
                  {resume.phone || "Não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">CPF</dt>
                <dd className="mt-1 text-sm text-foreground">
                  {resume.cpf || "Não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Data de nascimento
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-sm text-foreground">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                  {formatDate(resume.birthDate)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="gap-0 rounded-2xl border-border/80 bg-card py-0 shadow-sm">
            <CardContent className="p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    Experiência profissional
                  </h2>
                </div>
                <Badge variant="secondary">
                  {resume.experiences.length}
                </Badge>
              </div>

              {resume.experiences.length ? (
                <ol className="mt-6 space-y-6">
                  {resume.experiences.map((experience) => (
                    <li
                      key={experience.id}
                      className="relative border-l border-border pl-5 last:border-transparent"
                    >
                      <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-primary ring-4 ring-card" />
                      <h3 className="font-medium text-foreground">
                        {experience.position}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {experience.company}
                      </p>
                      <p className="mt-1 text-xs capitalize text-muted-foreground">
                        {formatMonth(experience.startDate)} — {formatMonth(experience.endDate)}
                      </p>
                      {experience.description && (
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {experience.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-5 text-sm text-muted-foreground">
                  Nenhuma experiência informada.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/80 bg-card py-0 shadow-sm">
            <CardContent className="p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <GraduationCap
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    Formação acadêmica
                  </h2>
                </div>
                <Badge variant="secondary">{resume.education.length}</Badge>
              </div>

              {resume.education.length ? (
                <ol className="mt-6 space-y-6">
                  {resume.education.map((education) => (
                    <li
                      key={education.id}
                      className="relative border-l border-border pl-5 last:border-transparent"
                    >
                      <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-primary ring-4 ring-card" />
                      <h3 className="font-medium text-foreground">
                        {education.course}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {education.institution}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {education.degree} · {formatMonth(education.startDate)} — {formatMonth(education.endDate)}
                      </p>
                      {education.description && (
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {education.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-5 text-sm text-muted-foreground">
                  Nenhuma formação informada.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
