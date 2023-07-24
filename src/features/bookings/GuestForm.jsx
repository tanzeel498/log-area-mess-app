import { useState } from "react";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useGuest from "./useGuest";
import useCreateGuest from "./useCreateGuest";

function GuestForm({ guestDetails, setGuestDetails }) {
  const { checkGuest, isPending: checkUserIsPending, error } = useGuest();
  const { createGuest, isPending: userCreateIsPending } = useCreateGuest();
  const [guestData, setGuestData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
    reset,
  } = useForm({ values: guestData });

  function handleResetForm() {
    reset();
    setGuestData({});
    unregister(["email", "fullName", "formation"]);
  }

  function onSubmit(data) {
    if (
      error?.message === "Guest Not found!" &&
      Object.keys(guestData).length > 0
    ) {
      return createGuest(data, {
        onSuccess: (retGuestData) => setGuestDetails(retGuestData),
      });
    } else if (Object.keys(guestData).length > 0) {
      return setGuestDetails(guestData);
    }
    // this will check guest data from DB
    checkGuest(+data.serviceNumber, {
      onSuccess: (returnData) => setGuestData(returnData),
      onError: () => setGuestData({ serviceNumber: +data.serviceNumber }),
    });
  }

  const isPending = userCreateIsPending || checkUserIsPending;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Service Number"
        error={errors.serviceNumber && errors.serviceNumber}
      >
        <Input
          type="Number"
          id="serviceNumber"
          disabled={
            isPending ||
            Object.keys(guestData).length ||
            Object.keys(guestDetails).length
          }
          {...register("serviceNumber", { required: true })}
        />
      </FormRow>
      {Object.keys(guestData).length > 0 ? (
        <>
          <FormRow label="Email" error={errors.email && errors.email}>
            <Input
              type="email"
              id="email"
              disabled={guestData.email || Object.keys(guestDetails).length}
              {...register("email", { required: true })}
            />
          </FormRow>
          <FormRow label="Full Name" error={errors.fullName && errors.fullName}>
            <Input
              type="text"
              id="fullName"
              disabled={guestData.fullName || Object.keys(guestDetails).length}
              {...register("fullName", { required: true })}
            />
          </FormRow>
          <FormRow
            label="Formation"
            error={errors.formation && errors.formation}
          >
            <Input
              type="text"
              id="formation"
              disabled={guestData.formation || Object.keys(guestDetails).length}
              {...register("formation", { required: true })}
            />
          </FormRow>
        </>
      ) : (
        ""
      )}

      {Object.keys(guestDetails).length <= 0 && (
        <FormRow>
          <Button
            onClick={handleResetForm}
            type="reset"
            $variation="secondary"
            disabled={isPending}
          >
            Reset
          </Button>
          <Button disabled={isPending}>
            {isPending ? (
              <SpinnerMini />
            ) : guestData.serviceNumber ? (
              "Proceed to Confirmation"
            ) : (
              "Confirm"
            )}
          </Button>
        </FormRow>
      )}
    </Form>
  );
}

export default GuestForm;
