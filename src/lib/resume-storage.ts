import { MOCK_RESUMES } from "@/data/mock-resumes";
import type {
  AcademicEducation,
  ProfessionalExperience,
  Resume,
} from "@/types/resume";

export const RESUMES_STORAGE_KEY = "gestao-curriculos:resumes:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isExperience(value: unknown): value is ProfessionalExperience {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.company === "string" &&
    typeof value.position === "string" &&
    typeof value.startDate === "string" &&
    (typeof value.endDate === "string" || value.endDate === null) &&
    typeof value.description === "string"
  );
}

function isEducation(value: unknown): value is AcademicEducation {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.institution === "string" &&
    typeof value.course === "string" &&
    typeof value.degree === "string" &&
    typeof value.startDate === "string" &&
    (typeof value.endDate === "string" || value.endDate === null) &&
    typeof value.description === "string"
  );
}

function isResume(value: unknown): value is Resume {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.fullName === "string" &&
    typeof value.jobTitle === "string" &&
    typeof value.email === "string" &&
    typeof value.phone === "string" &&
    typeof value.cpf === "string" &&
    typeof value.birthDate === "string" &&
    typeof value.city === "string" &&
    typeof value.state === "string" &&
    typeof value.summary === "string" &&
    (typeof value.photo === "string" || value.photo === null) &&
    Array.isArray(value.experiences) &&
    value.experiences.every(isExperience) &&
    Array.isArray(value.education) &&
    value.education.every(isEducation) &&
    typeof value.createdAt === "string"
  );
}

function cloneResumes(resumes: readonly Resume[]): Resume[] {
  return resumes.map((resume) => ({
    ...resume,
    experiences: resume.experiences.map((experience) => ({ ...experience })),
    education: resume.education.map((education) => ({ ...education })),
  }));
}

function seedResumes(): Resume[] {
  const resumes = cloneResumes(MOCK_RESUMES);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
    } catch {
      return resumes;
    }
  }

  return resumes;
}

export function readResumes(): Resume[] {
  if (typeof window === "undefined") return cloneResumes(MOCK_RESUMES);

  try {
    const stored = window.localStorage.getItem(RESUMES_STORAGE_KEY);
    if (stored === null) return seedResumes();

    const parsed: unknown = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every(isResume)) return parsed;
  } catch {
    return seedResumes();
  }

  return seedResumes();
}

export function readResume(id: string): Resume | undefined {
  return readResumes().find((resume) => resume.id === id);
}

export function createResumeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `resume-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function saveResumes(resumes: readonly Resume[]): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    RESUMES_STORAGE_KEY,
    JSON.stringify(resumes),
  );
}

export function upsertResume(resume: Resume): Resume[] {
  const resumes = readResumes();
  const nextResumes = [
    resume,
    ...resumes.filter((item) => item.id !== resume.id),
  ];

  saveResumes(nextResumes);
  return nextResumes;
}

export function deleteResume(id: string): Resume[] {
  const nextResumes = readResumes().filter((resume) => resume.id !== id);

  saveResumes(nextResumes);
  return nextResumes;
}
