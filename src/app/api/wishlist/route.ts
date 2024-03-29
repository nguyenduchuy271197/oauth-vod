import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userEmail, courseId } = await request.json();

  try {
    const item = await prisma.wishlist.findFirst({
      where: {
        user_email: userEmail,
        course_id: courseId,
      },
    });

    if (!item) {
      // write prisma create with userEmail and courseID
      await prisma.wishlist.create({
        data: {
          user_email: userEmail,
          course_id: courseId,
        },
      });
    }

    return Response.json("OK");
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
