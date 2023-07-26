import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createBooking as createBookingApi } from "../../services/apiBookings";

function useCreateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBooking, isLoading: isPending } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["booking", data.id]);
      navigate("/bookings/" + data.id);
      toast.success("Booking Created Successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createBooking, isPending };
}

export default useCreateBooking;
