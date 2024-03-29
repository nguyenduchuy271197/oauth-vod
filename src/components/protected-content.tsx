import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getMe } from "@/actions/me";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import LogoutBtn from "./logout-btn";

export default async function ProtectedContent() {
  const user = await getMe();

  async function logout() {
    "use server";
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    // revalidatePath("/");
  }

  if (!user)
    return (
      <div className="border p-8">
        <div>Login to see your info</div>
        <Button asChild>
          <Link
            href={`https://sso.teachable.com/secure/2026611/identity/oauth_provider/authorize?client_id=bBK8Q6YNvIXr0KZStKiPp3QXQ8WvRsar&response_type=code&required_scopes=name:read%20email:read&optional_scopes=courses:read`}
          >
            Login
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="border p-8">
      <div>Email: {user?.email}</div>
      <div>Name: {user?.name}</div>
      <div>Role: {user?.role}</div>
      <form action={logout}>
        <LogoutBtn />
      </form>
    </div>
  );
}
