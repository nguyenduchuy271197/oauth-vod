import { Me } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axios.get<Me>("/api/user/me").then((response) => response.data),
  });
}
