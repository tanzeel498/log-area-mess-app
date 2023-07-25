import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import {
  Guest,
  Header,
  Price,
  Section,
  StyledBookingDataBox,
} from "./BookingDataBox";
import { format, isToday } from "date-fns";
import {
  formatCurrency,
  formatDistanceFromNow,
  subtractDates,
} from "../../utils/helpers";
import DataItem from "../../ui/DataItem";
import {
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineXCircle,
} from "react-icons/hi";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import useCreateBooking from "./useCreateBooking";
import SpinnerMini from "../../ui/SpinnerMini";

function ConfirmBooking({ guestData, bookingData, availibilityData }) {
  const { createBooking, isPending } = useCreateBooking();
  const { settings, isLoading } = useSettings();

  if (isLoading) return <Spinner />;

  const {
    observations,
    hasBreakfast,
    numGuests,
    guestRoomData: {
      regularPrice,
      discount,
      id: guestRoomId,
      name: guestRoomName,
    },
  } = bookingData;
  const {
    fullName: guestName,
    email,
    formation,
    serviceNumber,
    id: guestId,
  } = guestData;
  const { startDate, endDate } = availibilityData;

  const numNights = subtractDates(endDate, startDate);
  const guestRoomPrice = numNights * (regularPrice - discount);
  const extrasPrice = hasBreakfast
    ? numNights * settings.breakfastPrice * numGuests
    : 0;
  const totalPrice = guestRoomPrice + extrasPrice;

  function handleConfirmBooking() {
    const bookingData = {
      guestRoomId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      numNights,
      numGuests: Number(numGuests),
      guestRoomPrice,
      extrasPrice,
      totalPrice,
      status: "unconfirmed",
      isPaid: false,
      observations,
      guestId,
      hasBreakfast,
    };
    createBooking(bookingData);
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in <span>{guestRoomName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{formation}</p>
          <span>&bull;</span>
          <p>Svc No: {serviceNumber}</p>
          <span>&bull;</span>
          <p>{email}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={
            hasBreakfast ? (
              <HiOutlineCheckCircle
                style={{ color: "var(--color-green-700)" }}
              />
            ) : (
              <HiOutlineXCircle style={{ color: "var(--color-red-700)" }} />
            )
          }
          label="Breakfast included?"
        >
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={false}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(
                guestRoomPrice
              )} Guest Room + ${formatCurrency(extrasPrice)} breakfast)`}
          </DataItem>

          <p>Will pay at property</p>
        </Price>
      </Section>
      <Section>
        <FormRow>
          <Button onClick={handleConfirmBooking} disabled={isPending}>
            {isPending ? <SpinnerMini /> : "Confirm Booking Details"}
          </Button>
        </FormRow>
      </Section>
    </StyledBookingDataBox>
  );
}

export default ConfirmBooking;
