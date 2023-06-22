import Heading from "../ui/Heading";
import Row from "../ui/Row";
import GuestRoomTable from "../features/guest-rooms/GuestRoomTable";
import AddGuestRoom from "../features/guest-rooms/AddGuestRoom";
import GuestRoomTableOperations from "../features/guest-rooms/GuestRoomTableOperations";

function GuestRooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guest Rooms</Heading>
        <GuestRoomTableOperations />
      </Row>

      <Row>
        <GuestRoomTable />
        <AddGuestRoom />
      </Row>
    </>
  );
}

export default GuestRooms;
