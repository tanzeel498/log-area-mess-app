import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCreateGuest() {
  const { mutate: createGuest, isLoading: isPending } = useMutation({
    mutationFn: createGuestApi,
    onError: (err) => toast.error(err.message),
  });

  return { createGuest, isPending };
}

export default useCreateGuest;
