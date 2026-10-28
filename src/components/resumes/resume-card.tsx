import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ResumeAvatar } from "@/components/resumes/resume-avatar";
import type { Resume } from "@/types/resume";

export function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Card className="h-full gap-0 rounded-2xl border-border/80 bg-card py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <ResumeAvatar fullName={resume.fullName} photo={resume.photo} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold tracking-tight text-foreground">
            {resume.fullName}
          </h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {resume.jobTitle}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-5 sm:px-6">
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {resume.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1.5 rounded-lg px-2.5 py-1">
            <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
            {resume.experiences.length} experiências
          </Badge>
          <Badge variant="outline" className="gap-1.5 rounded-lg px-2.5 py-1">
            <GraduationCap aria-hidden="true" className="size-3.5" />
            {resume.education.length} formações
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="mt-auto justify-between border-t border-border/70 bg-transparent px-5 py-4 sm:px-6">
        <span className="truncate text-xs text-muted-foreground">
          {[resume.city, resume.state].filter(Boolean).join(", ")}
        </span>
        <Button asChild variant="ghost" size="sm" className="shrink-0 gap-2">
          <Link href={`/sistema/paginas/curriculos/${resume.id}`}>
            Ver perfil
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
