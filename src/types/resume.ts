export interface ProfessionalExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface AcademicEducation {
  id: string;
  institution: string;
  course: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Resume {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  city: string;
  state: string;
  summary: string;
  photo: string | null;
  experiences: ProfessionalExperience[];
  education: AcademicEducation[];
  createdAt: string;
}
