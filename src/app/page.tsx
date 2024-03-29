import CourseGrid from "@/components/course-grid";
import ProtectedContent from "@/components/protected-content";
import PublicContent from "@/components/public-content";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Page() {
  const host = headers().get("host");

  return (
    <div className="container">
      <PublicContent />
      <ProtectedContent />

      <Suspense fallback={"Loading..."}>
        <CourseGrid />
      </Suspense>
    </div>
  );
}
