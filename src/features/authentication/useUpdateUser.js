import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success("Account updated successfully!");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => toast.error(err),
  });

  return { updateUser, isUpdating };
}
