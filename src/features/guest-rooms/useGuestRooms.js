import { useQuery } from "@tanstack/react-query";
import { getGuestRooms } from "../../services/apiGuestRooms";

export function useGuestRooms() {
  const {
    data: guestRooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guestRooms"],
    queryFn: getGuestRooms,
  });

  return { guestRooms, isLoading, error };
}
