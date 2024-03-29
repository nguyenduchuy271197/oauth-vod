import { getMe } from "@/actions/me";
import prisma from "@/lib/prisma";
import sdk from "@/lib/teachable-sdk";
import { CourseDetailResponse } from "@/lib/types";
import { AxiosResponse } from "axios";
import Link from "next/link";

export default async function Page() {
  const me = await getMe();

  const wishlist = await prisma.wishlist.findMany({
    where: {
      user_email: me!.email,
    },
  });

  const courseDetailPromises = wishlist.map(
    (item) =>
      sdk.showCourse({
        course_id: item.course_id,
      }) as Promise<AxiosResponse<CourseDetailResponse>>
  );

  const courseDetailResponses = await Promise.all(courseDetailPromises);

  return (
    <div className="container py-8">
      <h1 className="text-2xl mb-4 font-bold">Wishlist</h1>
      <ul>
        {courseDetailResponses.map((response) => {
          const course = response.data.course;
          return (
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
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
