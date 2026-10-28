"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/forms/form-field";
import { ResumeAvatar } from "@/components/resumes/resume-avatar";
import { Button } from "@/components/ui/button";
import type { ResumeFormValues } from "@/schemas/resume-schema";

interface ImageUploadFieldProps {
  fullName: string;
  photo: ResumeFormValues["photo"];
  onPhotoChange: (photo: string | null) => void;
}

const maxFileSize = 1.5 * 1024 * 1024;
const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

export function ImageUploadField({
  fullName,
  photo,
  onPhotoChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    if (!supportedTypes.includes(file.type)) {
      setError("Selecione uma imagem JPG, PNG ou WebP.");
      event.currentTarget.value = "";
      return;
    }

    if (file.size > maxFileSize) {
      setError("A imagem deve ter no máximo 1,5 MB.");
      event.currentTarget.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setError("Não foi possível ler essa imagem.");
        toast.error("Não foi possível carregar a imagem.");
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      setError("");
      onPhotoChange(reader.result);
      toast.success("Imagem carregada para a prévia.");
      if (inputRef.current) inputRef.current.value = "";
    };
    reader.onerror = () => {
      setError("Não foi possível ler essa imagem.");
      toast.error("Não foi possível carregar a imagem.");
      if (inputRef.current) inputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    onPhotoChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <FormField id="photo" label="Foto de perfil">
      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-border bg-background/60 p-4 sm:flex-row sm:items-center sm:p-5">
        <ResumeAvatar
          fullName={fullName || "Novo currículo"}
          photo={photo ?? null}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <input
            ref={inputRef}
            id="photo"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleChange}
            aria-describedby={error ? "photo-error" : "photo-hint"}
            aria-invalid={Boolean(error)}
            className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-accent"
          />
          <p id="photo-hint" className="mt-2 text-xs leading-5 text-muted-foreground">
            JPG, PNG ou WebP, até 1,5 MB. A imagem fica salva neste navegador.
          </p>
          {error && (
            <p id="photo-error" role="alert" className="mt-2 text-xs text-destructive">
              {error}
            </p>
          )}
        </div>
        {photo && (
          <Button
            type="button"
            variant="ghost"
            onClick={removePhoto}
            className="h-9 shrink-0 text-muted-foreground hover:text-destructive"
          >
            Remover foto
          </Button>
        )}
      </div>
    </FormField>
  );
}
