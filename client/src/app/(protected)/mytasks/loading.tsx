// app/course/[courseId]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Skeleton className="h-[400px] w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </div>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:w-1/3">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
