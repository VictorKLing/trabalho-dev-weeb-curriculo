import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="h-full rounded-2xl border-border/80 bg-background shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <CardContent className="p-5 sm:p-6">
        <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
