import Button from "../../ui/Button";
import CreateGuestRoomForm from "./CreateGuestRoomForm";
import Modal from "../../ui/Modal";

function AddGuestRoom() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-room-form">
          <Button>Add new Guest Room</Button>
        </Modal.Open>
        <Modal.Window name="guest-room-form">
          <CreateGuestRoomForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuestRoom;
