import Spinner from "../../ui/Spinner";
import GuestRoomRow from "./GuestRoomRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useGuestRooms } from "./useGuestRooms";

function GuestRoomTable() {
  const { isLoading, guestRooms } = useGuestRooms();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  if (isLoading) return <Spinner />;

  if (!guestRooms.length) return <Empty resourceName="Guest Rooms" />;

  // filtering the guest rooms first
  let filteredGuestRooms;
  if (filterValue === "with-discount")
    filteredGuestRooms = guestRooms.filter((guestRoom) => guestRoom.discount);
  else if (filterValue === "no-discount")
    filteredGuestRooms = guestRooms.filter((guestRoom) => !guestRoom.discount);
  else filteredGuestRooms = guestRooms;

  // sorting the filtered guest Rooms
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedGuestRooms = filteredGuestRooms.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Table columns="0.6fr 1.5fr 1.5fr 1.5fr 1fr 0.5fr">
      <Table.Header role="row">
        <div></div>
        <div>Guest Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Menus>
        <Table.Body
          data={sortedGuestRooms}
          render={(guestRoom) => (
            <GuestRoomRow guestRoom={guestRoom} key={guestRoom.id} />
          )}
        />
      </Menus>
    </Table>
  );
}

export default GuestRoomTable;
