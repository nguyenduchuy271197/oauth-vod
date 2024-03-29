"use client";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function WishlistBtn({
  userEmail,
  courseId,
}: {
  userEmail: string;
  courseId: number;
}) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => axios.post("/api/wishlist", { userEmail, courseId }),
    onMutate: () =>
      toast("Added to Your Wishlist", {
        action: {
          label: "Go to Wishlist",
          onClick: () => router.push("/wishlist"),
        },
      }),
    onError: (error) => console.log(error),
  });

  return <Button onClick={() => mutate()}>Add to wishlist</Button>;
}
