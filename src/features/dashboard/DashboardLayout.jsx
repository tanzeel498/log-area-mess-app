import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useGuestRooms } from "../guest-rooms/useGuestRooms";
import SalesChart from "./SalesChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, numDays, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();
  const { guestRooms, isLoading: isLoading3 } = useGuestRooms();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numGuestRooms={guestRooms.length}
        numDays={numDays}
      />
      <TodayActivity />
      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
