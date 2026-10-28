import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Search,
  UserRound,
} from "lucide-react";
import { FeatureCard } from "@/components/home/feature-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: UserRound,
    title: "Perfis completos",
    description:
      "Reúna os dados de contato e a apresentação profissional de cada pessoa em um só lugar.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Histórico organizado",
    description:
      "Consulte experiências e formação com clareza, sem perder detalhes importantes.",
  },
  {
    icon: Search,
    title: "Consulta simples",
    description:
      "Encontre perfis pelo nome ou cargo e volte rapidamente às informações necessárias.",
  },
];

const steps = [
  {
    number: "01",
    title: "Cadastre o perfil",
    description: "Inclua os dados e a apresentação profissional do candidato.",
  },
  {
    number: "02",
    title: "Organize a trajetória",
    description: "Adicione experiências e formações em uma estrutura fácil de ler.",
  },
  {
    number: "03",
    title: "Consulte quando precisar",
    description: "Revise, atualize e encontre as informações de cada currículo.",
  },
];

export default function Home() {
  return (
    <main className="w-full flex-1">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="size-2 rounded-full bg-primary" />
            Gestão de currículos, com clareza
          </div>

          <h1 className="max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[3.65rem]">
            Talento certo,
            <span className="block text-primary">em cada oportunidade.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Organize currículos, experiências e formação em um espaço simples de
            consultar. Mais clareza para conhecer cada trajetória profissional.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl px-5 text-sm shadow-sm">
              <Link href="/sistema/paginas/curriculos">
                Ver currículos
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-border/80 bg-card px-5 text-sm"
            >
              <Link href="/sistema/paginas/curriculos/novo">
                Cadastrar currículo
              </Link>
            </Button>
          </div>

          <div className="mt-9 flex items-center gap-3 border-t border-border/70 pt-6">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="grid size-9 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-semibold text-secondary-foreground">
                MC
              </span>
              <span className="grid size-9 place-items-center rounded-full border-2 border-background bg-accent text-xs font-semibold text-accent-foreground">
                JP
              </span>
              <span className="grid size-9 place-items-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-muted-foreground">
                AL
              </span>
            </div>
            <p className="max-w-xs text-sm leading-5 text-muted-foreground">
              Cada perfil reúne informações profissionais em um só lugar.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -right-5 -top-7 size-32 rounded-full bg-accent/80 blur-3xl" />
          <div className="absolute -bottom-8 -left-4 size-40 rounded-full bg-secondary blur-3xl" />

          <Card className="relative gap-0 overflow-hidden rounded-[1.75rem] border-border/80 bg-card py-0 shadow-[0_24px_80px_-40px_oklch(0.38_0.075_158/0.42)]">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-7">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Perfil em destaque
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Prévia de currículo
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Disponível
              </span>
            </div>

            <CardContent className="p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-semibold tracking-tight text-primary-foreground">
                  MC
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-semibold tracking-tight text-foreground">
                    Mariana Costa
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Product Designer
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                Designer de produto com experiência em pesquisa, sistemas de
                design e criação de experiências digitais acessíveis.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Design de produto", "Pesquisa", "Acessibilidade"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-medium text-foreground/80"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-border/70 pt-5">
                <div className="flex items-start gap-2.5">
                  <BriefcaseBusiness
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Experiência</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      Design de produto
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <GraduationCap
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Formação</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      Design Digital
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="absolute -bottom-5 right-5 hidden items-center gap-2 rounded-2xl border border-border/80 bg-card px-4 py-3 shadow-lg sm:flex">
            <span className="grid size-8 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Check aria-hidden="true" className="size-4" />
            </span>
            <span className="text-sm font-medium text-foreground">
              Perfil organizado
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              Feito para dar clareza
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
              As informações certas, fáceis de encontrar.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Um perfil organizado ajuda a entender a experiência de cada
              candidato e facilita a consulta ao longo do processo.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-8">
        <div className="max-w-md">
          <p className="text-sm font-semibold text-primary">Um fluxo direto</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
            Da primeira informação à consulta.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Cadastre os dados uma vez e mantenha a trajetória profissional
            pronta para revisar.
          </p>
          <Button
            asChild
            variant="link"
            className="mt-5 h-auto gap-2 px-0 text-sm font-semibold"
          >
            <Link href="/sistema/paginas/curriculos/novo">
              Começar um cadastro
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>

        <ol className="grid gap-3 sm:grid-cols-3">
          {steps.map(({ number, title, description }) => (
            <li
              key={number}
              className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6"
            >
              <span className="text-xs font-semibold tracking-[0.12em] text-primary">
                {number}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
