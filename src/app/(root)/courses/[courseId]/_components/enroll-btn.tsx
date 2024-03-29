import { getMe } from "@/actions/me";
import { Button } from "@/components/ui/button";
import sdk from "@/lib/teachable-sdk";
import { UsersResponse } from "@/lib/types";
import { AxiosResponse } from "axios";
import Link from "next/link";

export default async function EnrollBtn({ courseId }: { courseId: number }) {
  const me = await getMe();

  if (!me)
    return (
      <Button asChild>
        <Link
          href={`https://sso.teachable.com/secure/2026611/identity/oauth_provider/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&required_scopes=name:read%20email:read&optional_scopes=courses:read`}
        >
          Login to enroll
        </Link>
      </Button>
    );

  async function enroll() {
    "use server";
    if (me && me.email && me.role === "student") {
      try {
        const { data } = (await sdk.listUsers({
          email: me.email,
        })) as AxiosResponse<UsersResponse>;

        const user = data.users[0];
        if (!user) return;

        await sdk.enrollUser({ user_id: user.id, course_id: courseId });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <form action={enroll}>
      <Button>Enroll now</Button>
    </form>
  );
}
