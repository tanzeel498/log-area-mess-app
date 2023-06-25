import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateGuestRoom } from "../../services/apiGuestRooms";
import toast from "react-hot-toast";

export function useUpdateGuestRoom() {
  const queryClient = useQueryClient();

  const { mutate: updateGuestRoom, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newGuestRoomData, id }) =>
      createUpdateGuestRoom(newGuestRoomData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["guestRooms"]);
      toast.success("Guest Room edited successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateGuestRoom };
}
