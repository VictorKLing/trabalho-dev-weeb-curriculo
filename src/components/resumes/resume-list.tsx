"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FilePlus2, Search, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { ResumeCard } from "@/components/resumes/resume-card";
import { ResumeListSkeleton } from "@/components/resumes/resume-list-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Resume } from "@/types/resume";

const createResumeHref = "/curriculos/cadastrar";

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

export function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    import("@/lib/resume-storage")
      .then(({ readResumes }) => {
        if (isCurrent) setResumes(readResumes());
      })
      .catch(() => {
        toast.error("Não foi possível carregar os currículos.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const filteredResumes = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim());
    if (!normalizedQuery) return resumes;

    return resumes.filter((resume) =>
      normalizeSearch(`${resume.fullName} ${resume.jobTitle}`).includes(
        normalizedQuery,
      ),
    );
  }, [query, resumes]);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Banco de talentos</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
            Currículos
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Consulte os perfis, experiências e formações em um só lugar.
          </p>
        </div>

        <Button asChild className="h-11 shrink-0 gap-2 rounded-xl px-4">
          <Link href={createResumeHref}>
            <FilePlus2 aria-hidden="true" className="size-4" />
            Novo currículo
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-y border-border/70 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {isLoading
            ? "Carregando perfis..."
            : `${resumes.length} ${resumes.length === 1 ? "perfil cadastrado" : "perfis cadastrados"}`}
        </p>
        <div className="relative w-full sm:max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome ou cargo"
            aria-label="Buscar currículos por nome ou cargo"
            className="h-11 rounded-xl border-border/80 bg-card pl-9"
          />
        </div>
      </div>

      <section className="mt-7" aria-label="Lista de currículos">
        {isLoading ? (
          <ResumeListSkeleton />
        ) : resumes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <UsersRound aria-hidden="true" className="size-5" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-foreground">
              Sua lista está pronta para começar
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Cadastre o primeiro perfil para reunir informações, experiências e
              formação em um só lugar.
            </p>
            <Button asChild className="mt-6 h-11 gap-2 rounded-xl px-4">
              <Link href={createResumeHref}>
                <FilePlus2 aria-hidden="true" className="size-4" />
                Criar meu primeiro currículo
              </Link>
            </Button>
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="rounded-2xl border border-border/80 bg-card px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              Nenhum perfil encontrado
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tente buscar por outro nome ou cargo.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredResumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
