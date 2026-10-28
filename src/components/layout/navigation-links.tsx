import Link from "next/link";
import { Files, House, UserRoundPlus, type LucideIcon } from "lucide-react";

const links: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Início", href: "/", icon: House },
  {
    label: "Currículos",
    href: "/curriculos/visualizar",
    icon: Files,
  },
  {
    label: "Cadastrar currículo",
    href: "/curriculos/cadastrar",
    icon: UserRoundPlus,
  },
];

function isCurrentPage(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  if (href === "/curriculos/cadastrar") return pathname === href;

  if (href === "/curriculos/visualizar") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return pathname === href;
}

export function NavigationLinks({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Navegação principal">
      <ul className="flex flex-wrap items-center gap-1">
        {links.map(({ label, href, icon: Icon }) => {
          const active = isCurrentPage(pathname, href);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon aria-hidden="true" className="size-4" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
