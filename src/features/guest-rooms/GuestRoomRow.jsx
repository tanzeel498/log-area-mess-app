import styled from "styled-components";

import CreateGuestRoomForm from "./CreateGuestRoomForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteGuestRoom } from "./useDeleteGuestRoom";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateGuestRoom } from "./useCreateGuestRoom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const GuestRoom = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function GuestRoomRow({ guestRoom }) {
  const { deleteGuestRoom, isDeleting } = useDeleteGuestRoom();
  const { createGuestRoom, isCreating } = useCreateGuestRoom();

  const {
    id: guestRoomId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = guestRoom;

  function handleDuplicate() {
    createGuestRoom({
      name: "copy of " + name,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <GuestRoom>{name}</GuestRoom>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={guestRoomId} />

              <Menus.List id={guestRoomId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateGuestRoomForm guestRoomToUpdate={guestRoom} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={"Guest Room " + name}
                  disabled={isDeleting}
                  onConfirm={() => deleteGuestRoom(guestRoomId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default GuestRoomRow;
