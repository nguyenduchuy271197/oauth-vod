import { getCourses } from "@/actions/me";

export default async function Page() {
  const data = await getCourses();

  return (
    <div>
      <h1>My Learnings</h1>
      {data.meta.total === 0 ? (
        <p>No courses found</p>
      ) : (
        <ul>
          {data.courses.map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
