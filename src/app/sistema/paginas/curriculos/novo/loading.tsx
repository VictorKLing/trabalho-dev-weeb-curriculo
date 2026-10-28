import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingResumeForm() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-3 h-9 w-64 max-w-full" />
      <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      <div className="mt-8 space-y-5 rounded-2xl border border-border/80 bg-card p-5 sm:p-8">
        <Skeleton className="h-5 w-64 max-w-full" />
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="h-11 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-28 rounded-xl" />
      </div>
    </main>
  );
}
