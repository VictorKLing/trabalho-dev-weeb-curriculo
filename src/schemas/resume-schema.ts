import * as yup from "yup";

function isValidMaskedDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;

  const [, day, month, year] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day)
  );
}

function requiredDate(message: string) {
  return yup
    .string()
    .required(message)
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Use o formato DD/MM/AAAA.")
    .test(
      "valid-date",
      "Informe uma data válida.",
      (value) => Boolean(value && isValidMaskedDate(value)),
    );
}

function optionalDate() {
  return yup
    .string()
    .default("")
    .test(
      "valid-date",
      "Informe uma data válida no formato DD/MM/AAAA.",
      (value) => !value || isValidMaskedDate(value),
    );
}

export const resumeSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, "Informe pelo menos 3 caracteres.")
    .required("Informe o nome completo."),
  jobTitle: yup
    .string()
    .trim()
    .min(2, "Informe o cargo.")
    .required("Informe o cargo desejado."),
  email: yup
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .required("Informe o e-mail."),
  phone: yup
    .string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Informe um telefone válido.")
    .required("Informe o telefone."),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Informe um CPF válido.")
    .required("Informe o CPF."),
  birthDate: requiredDate("Informe a data de nascimento."),
  city: yup
    .string()
    .trim()
    .min(2, "Informe a cidade.")
    .required("Informe a cidade."),
  state: yup
    .string()
    .trim()
    .length(2, "Use a sigla de 2 letras do estado.")
    .transform((value) =>
      typeof value === "string" ? value.trim().toUpperCase() : value,
    )
    .required("Informe o estado."),
  summary: yup
    .string()
    .trim()
    .min(30, "O resumo deve ter pelo menos 30 caracteres.")
    .required("Informe o resumo profissional."),
  photo: yup.string().nullable().default(null),
  experiences: yup
    .array()
    .of(
      yup.object({
        id: yup.string().default(""),
        company: yup
          .string()
          .trim()
          .min(2, "Informe o nome da empresa.")
          .required("Informe a empresa."),
        position: yup
          .string()
          .trim()
          .min(2, "Informe o cargo.")
          .required("Informe o cargo."),
        startDate: requiredDate("Informe a data de início."),
        endDate: optionalDate(),
        description: yup
          .string()
          .trim()
          .min(10, "A descrição deve ter pelo menos 10 caracteres.")
          .required("Descreva as atividades realizadas."),
      }),
    )
    .default([]),
  education: yup
    .array()
    .of(
      yup.object({
        id: yup.string().default(""),
        institution: yup
          .string()
          .trim()
          .min(2, "Informe a instituição.")
          .required("Informe a instituição."),
        course: yup
          .string()
          .trim()
          .min(2, "Informe o curso.")
          .required("Informe o curso."),
        degree: yup
          .string()
          .trim()
          .min(2, "Informe o nível de formação.")
          .required("Informe o nível de formação."),
        startDate: requiredDate("Informe a data de início."),
        endDate: optionalDate(),
        description: yup.string().trim().default(""),
      }),
    )
    .default([]),
});

export type ResumeFormValues = yup.InferType<typeof resumeSchema>;
