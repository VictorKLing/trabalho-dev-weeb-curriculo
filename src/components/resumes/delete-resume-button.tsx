"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface DeleteResumeButtonProps {
  id: string;
  fullName: string;
}

export function DeleteResumeButton({ id, fullName }: DeleteResumeButtonProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleDelete() {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const { default: Swal } = await import("sweetalert2");
      const result = await Swal.fire({
        title: "Excluir este currículo?",
        text: `O perfil de ${fullName} será removido desta lista.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Excluir currículo",
        cancelButtonText: "Manter currículo",
        reverseButtons: true,
        confirmButtonColor: "#365f4d",
      });

      if (!result.isConfirmed) return;

      const { deleteResume } = await import("@/lib/resume-storage");
      deleteResume(id);
      toast.success("Currículo excluído.");
      router.push("/curriculos/visualizar");
    } catch {
      toast.error("Não foi possível excluir o currículo.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDelete}
      disabled={isProcessing}
      className="h-11 rounded-xl px-4"
    >
      {isProcessing ? "Processando..." : "Excluir currículo"}
    </Button>
  );
}
