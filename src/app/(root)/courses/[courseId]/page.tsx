import EnrollBtn from "./_components/enroll-btn";
import { Suspense } from "react";
import sdk from "@/lib/teachable-sdk";
import { notFound } from "next/navigation";
import { CourseDetailResponse, PricingPlanResponse } from "@/lib/types";
import { AxiosPromise } from "axios";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = parseInt(params.courseId);

  if (!courseId) return notFound();

  const courseDetailPromise = sdk.showCourse({
    course_id: courseId,
  }) as AxiosPromise<CourseDetailResponse>;

  const pricingPlansPromise =
    sdk.listPricingPlans() as AxiosPromise<PricingPlanResponse>;

  const [{ data: courseDetailResponse }, { data: pricingPlansResponse }] =
    await Promise.all([courseDetailPromise, pricingPlansPromise]);

  const coursePricing = pricingPlansResponse.pricing_plans.find(
    (plan) => plan.course_id === courseId
  );

  if (!courseDetailResponse.course) return notFound();

  return (
    <div>
      <div className="border p-4 mb-8 text-center">
        <h1>{courseDetailResponse.course.name}</h1>
        <p>{courseDetailResponse.course.id}</p>
        {coursePricing && (
          <p>
            Price: {coursePricing.price} {coursePricing.currency}
          </p>
        )}
        <Suspense fallback="Loading...">
          <EnrollBtn courseId={courseId} />
        </Suspense>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Lectures</h2>

        {courseDetailResponse.course.lecture_sections
          .sort((a, b) => a.position - b.position)
          .map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-8 border p-4"
            >
              <p>{section.position}</p>
              <h2>{section.name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
