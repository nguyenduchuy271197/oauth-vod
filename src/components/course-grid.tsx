import sdk from "@/lib/teachable-sdk";
import { CourseListResponse } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { getMe } from "@/actions/me";
import WishlistBtn from "./wishlist-btn";

export default async function CourseGrid() {
  const { data }: { data?: CourseListResponse } = await sdk.listCourses();
  const me = await getMe();

  if (!data) return null;

  return (
    <div className="py-12">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div className="grid grid-cols-2 gap-8">
        {data.courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-6 mt-6"
          >
            <div className="flex">
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  <Link
                    href={`/courses/${course.id}`}
                    className="hover:underline"
                  >
                    {course.name}
                  </Link>
                </h2>
                <p className="text-gray-600 mt-2 mb-4">{course.id}</p>

                {me && (
                  <WishlistBtn userEmail={me.email} courseId={course.id} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
