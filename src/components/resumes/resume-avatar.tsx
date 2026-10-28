import Image from "next/image";

interface ResumeAvatarProps {
  fullName: string;
  photo: string | null;
  size?: "sm" | "lg";
}

function getInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toLocaleUpperCase("pt-BR");
}

export function ResumeAvatar({
  fullName,
  photo,
  size = "sm",
}: ResumeAvatarProps) {
  const dimensions = size === "lg" ? "size-20 rounded-2xl text-xl" : "size-14 rounded-xl text-base";

  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden bg-secondary font-semibold text-secondary-foreground ${dimensions}`}
    >
      {photo ? (
        <Image
          src={photo}
          alt={`Foto de ${fullName}`}
          width={80}
          height={80}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{getInitials(fullName)}</span>
      )}
    </div>
  );
}
