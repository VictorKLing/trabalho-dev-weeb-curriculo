import Link from "next/link";
import { Files } from "lucide-react";
import { Suspense } from "react";
import { NavigationLinks } from "@/components/layout/navigation-links";
import { SiteNavigation } from "@/components/layout/site-navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:min-h-[4.5rem] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0 lg:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label="Gestão de currículos, página inicial"
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Files aria-hidden="true" className="size-5" />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Gestão de currículos
            </span>
            <span className="text-xs text-muted-foreground">
              Talentos em um só lugar
            </span>
          </span>
        </Link>

        <Suspense fallback={<NavigationLinks pathname="" />}>
          <SiteNavigation />
        </Suspense>
      </div>
    </header>
  );
}
