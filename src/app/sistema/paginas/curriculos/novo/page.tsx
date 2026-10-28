import { ResumeForm } from "@/components/forms/resume-form";

export default async function NewCurriculumPage({
  searchParams,
}: {
  searchParams: Promise<{ editar?: string | string[] }>;
}) {
  const { editar } = await searchParams;
  const resumeId = Array.isArray(editar) ? editar[0] : editar;

  return <ResumeForm resumeId={resumeId} />;
}
