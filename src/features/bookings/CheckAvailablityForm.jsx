import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useCheckAvailability from "./useCheckAvailability";
import SpinnerMini from "../../ui/SpinnerMini";

function CheckAvailabilityForm({ data, setData }) {
  const { checkAvailable, isPending } = useCheckAvailability();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(formData) {
    checkAvailable(formData, {
      onSuccess: (guestRoomsData) => setData(guestRoomsData),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Start Date" error={errors.startDate && errors.startDate}>
        <Input
          type="date"
          id="startDate"
          disabled={isPending || Object.keys(data).length}
          {...register("startDate", { required: true })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors.endDate && errors.endDate}>
        <Input
          type="date"
          id="endDate"
          disabled={isPending || Object.keys(data).length}
          {...register("endDate", { required: true })}
        />
      </FormRow>
      {Object.keys(data).length <= 0 && (
        <FormRow>
          <Button onClick={reset} type="reset" $variation="secondary">
            Clear
          </Button>
          <Button disabled={isPending}>
            {isPending ? <SpinnerMini /> : "Check Availability"}
          </Button>
        </FormRow>
      )}
    </Form>
  );
}

export default CheckAvailabilityForm;
