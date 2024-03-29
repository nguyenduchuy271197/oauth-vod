import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLogout() {
  return useMutation({
    mutationFn: () => axios.post("/api/auth/logout"),
  });
}
