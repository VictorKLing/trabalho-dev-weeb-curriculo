import Link from "next/link";

const secondaryLinks = [
  { label: "Início", href: "/" },
  { label: "Currículos", href: "/sistema/paginas/curriculos" },
  {
    label: "Cadastrar currículo",
    href: "/sistema/paginas/curriculos/novo",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-card/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gestão de currículos
        </p>

        <nav aria-label="Links secundários">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {secondaryLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
