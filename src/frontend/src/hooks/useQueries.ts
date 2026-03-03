import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Inquiry } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInquiryCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["inquiryCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getInquiryCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
      sectorText,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
      sectorText: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitInquiry(name, email, phone, message, sectorText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["inquiryCount"] });
    },
  });
}
