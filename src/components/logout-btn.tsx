"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function LogoutBtn() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      Logout
    </Button>
  );
}
