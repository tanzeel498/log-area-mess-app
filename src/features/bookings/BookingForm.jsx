import styled from "styled-components";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import { StyledCheckbox } from "../../ui/Checkbox";

const Select = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

function BookingForm({ data, bookingDetails, setBookingDetails }) {
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit({ guestRoomId, ...formData }) {
    formData.guestRoomData = data.find(
      (guestRoom) => guestRoom.id === +guestRoomId
    );
    setBookingDetails(formData);
  }

  if (isLoadingSettings) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Select Guest Room"
        error={errors?.guestRoom && errors.guestRoom}
      >
        <Select
          {...register("guestRoomId", { required: true })}
          disabled={Object.keys(bookingDetails).length}
        >
          {data.map((guestRoom) => (
            <option key={guestRoom.id} value={guestRoom.id}>
              {guestRoom.name}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow
        label="Number of Guests*"
        error={errors.numGuests && errors.numGuests}
      >
        <Input
          type="Number"
          id="numGuests"
          disabled={Object.keys(bookingDetails).length}
          {...register("numGuests", { required: true })}
        />
      </FormRow>
      <FormRow label="Observations">
        <Input
          type="text"
          id="observations"
          {...register("observations")}
          disabled={Object.keys(bookingDetails).length}
        />
      </FormRow>
      <StyledCheckbox>
        <input
          type="checkbox"
          id="hasBreakfast"
          disabled={Object.keys(bookingDetails).length}
          {...register("hasBreakfast")}
        />
        <label htmlFor="hasBreakfast">
          Want to add breakfast for {formatCurrency(settings.breakfastPrice)}{" "}
          per Guest ?
        </label>
      </StyledCheckbox>
      {Object.keys(bookingDetails).length <= 0 && (
        <FormRow>
          <Button onClick={reset} type="reset" $variation="secondary">
            Clear
          </Button>
          <Button>Proceed to Guest Details</Button>
        </FormRow>
      )}
    </Form>
  );
}

export default BookingForm;
