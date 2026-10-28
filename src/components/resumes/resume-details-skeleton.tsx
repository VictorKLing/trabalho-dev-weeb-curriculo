import { Skeleton } from "@/components/ui/skeleton";

export function ResumeDetailsSkeleton() {
  return (
    <main
      aria-label="Carregando currículo"
      aria-busy="true"
      className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <Skeleton className="mb-8 h-4 w-36" />
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Skeleton className="size-20 rounded-2xl" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-7 w-64 max-w-full" />
            <Skeleton className="h-4 w-48 max-w-full" />
          </div>
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
        <div className="mt-8 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7"
          >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-6 h-4 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-3 h-4 w-4/5" />
          </div>
        ))}
      </div>
    </main>
  );
}
