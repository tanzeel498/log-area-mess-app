import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 3fr 3fr 2fr 1.2fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, guests, numNights, status } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}

      <Guest>{guests.fullName}</Guest>

      <Guest>{guests.formation}</Guest>

      <span>{numNights} Nights</span>

      {status === "unconfirmed" && (
        <Button
          $variation="secondary"
          $size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
