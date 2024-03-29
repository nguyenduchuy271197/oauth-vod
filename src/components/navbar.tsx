import Link from "next/link";
import { Button } from "./ui/button";
import { getMe } from "@/actions/me";

export default async function Navbar() {
  const user = await getMe();
  return (
    <nav className="bg-gray-700">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Button variant="secondary" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
                {user && (
                  <>
                    <Button variant="secondary" asChild>
                      <Link href="/my-learnings">My Learnings</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/wishlist">My Wishlist</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
