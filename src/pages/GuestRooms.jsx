import Heading from "../ui/Heading";
import Row from "../ui/Row";
import GuestRoomTableOperations from "../features/guest-rooms/GuestRoomTableOperations";

function GuestRooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guest Rooms</Heading>
        <GuestRoomTableOperations />
      </Row>
    </>
  );
}

export default GuestRooms;
