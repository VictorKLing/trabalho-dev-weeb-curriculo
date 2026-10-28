"use client";

import { usePathname } from "next/navigation";
import { NavigationLinks } from "@/components/layout/navigation-links";

export function SiteNavigation() {
  const pathname = usePathname();

  return <NavigationLinks pathname={pathname} />;
}
