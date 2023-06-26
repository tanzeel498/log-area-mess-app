import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuestRoom as deleteGuestRoomApi } from "../../services/apiGuestRooms";
import toast from "react-hot-toast";

export function useDeleteGuestRoom() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteGuestRoom } = useMutation({
    mutationFn: deleteGuestRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestRooms"] });
      toast.success("Guest Room deleted Successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteGuestRoom };
}
