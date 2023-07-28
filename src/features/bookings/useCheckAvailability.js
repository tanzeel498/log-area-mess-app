import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkRoomsAvailability } from "../../services/apiBookings";

function useCheckAvailability() {
  const {
    mutate: checkAvailable,
    isLoading: isPending,
    error,
  } = useMutation({
    mutationFn: checkRoomsAvailability,
    onError: (err) => toast.error(err.message),
  });

  return { checkAvailable, isPending, error };
}

export default useCheckAvailability;
