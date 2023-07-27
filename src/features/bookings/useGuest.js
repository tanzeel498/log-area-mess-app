import { useMutation } from "@tanstack/react-query";
import { getGuest } from "../../services/apiBookings";

function useGuest() {
  const {
    mutate: checkGuest,
    isLoading: isPending,
    error,
  } = useMutation({
    mutationFn: getGuest,
  });

  return { checkGuest, isPending, error };
}

export default useGuest;
