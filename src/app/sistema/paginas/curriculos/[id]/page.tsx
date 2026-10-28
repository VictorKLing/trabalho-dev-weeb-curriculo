import { ResumeDetails } from "@/components/resumes/resume-details";

export default async function CurriculumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ResumeDetails key={id} id={id} />;
}
