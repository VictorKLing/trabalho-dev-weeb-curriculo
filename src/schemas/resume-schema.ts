import * as yup from "yup";

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
  phone: yup.string().required("Informe o telefone."),
  cpf: yup.string().required("Informe o CPF."),
  birthDate: yup.string().required("Informe a data de nascimento."),
  city: yup
    .string()
    .trim()
    .min(2, "Informe a cidade.")
    .required("Informe a cidade."),
  state: yup
    .string()
    .trim()
    .length(2, "Use a sigla de 2 letras do estado.")
    .required("Informe o estado."),
  summary: yup
    .string()
    .trim()
    .min(30, "O resumo deve ter pelo menos 30 caracteres.")
    .required("Informe o resumo profissional."),
});

export type ResumeFormValues = yup.InferType<typeof resumeSchema>;
