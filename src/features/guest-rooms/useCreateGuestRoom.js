import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateGuestRoom } from "../../services/apiGuestRooms";
import toast from "react-hot-toast";

export function useCreateGuestRoom() {
  const queryClient = useQueryClient();

  const { mutate: createGuestRoom, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateGuestRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(["guestRooms"]);
      toast.success("New Guest Room created successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createGuestRoom };
}
