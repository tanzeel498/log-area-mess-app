// import { useState } from "react";
// import Heading from "../ui/Heading";
// import Row from "../ui/Row";
// import CheckAvailabilityForm from "../features/bookings/CheckAvailablityForm";
// import BookingForm from "../features/bookings/BookingForm";
// import GuestForm from "../features/bookings/GuestForm";
// import ConfirmBooking from "../features/bookings/ConfirmBooking";
// import ButtonText from "../ui/ButtonText";

// function CreateBooking() {
//   const [availabilityData, setAvailabilityData] = useState({});
//   const [bookingDetails, setBookingDetails] = useState({});
//   const [guestDetails, setGuestDetails] = useState({});

//   function handleResetAvailabilityData() {
//     setAvailabilityData({});
//     setBookingDetails({});
//     setGuestDetails({});
//   }
//   function handleResetBookingDetails() {
//     setBookingDetails({});
//     setGuestDetails({});
//   }
//   function handleResetGuestDetails() {
//     setGuestDetails({});
//   }

//   return (
//     <Row>
//       <Heading as="h1">Create Booking</Heading>

//       <Row>
//         <Row type="horizontal">
//           <Heading as="h3">Check for Available Guest Rooms</Heading>
//           {Object.keys(availabilityData).length > 0 && (
//             <ButtonText onClick={handleResetAvailabilityData}>
//               Change Duration
//             </ButtonText>
//           )}
//         </Row>
//         <CheckAvailabilityForm
//           setData={setAvailabilityData}
//           data={availabilityData}
//         />
//       </Row>

//       {availabilityData?.availableGuestRooms?.length > 0 && (
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h3">Add Booking Details</Heading>
//             {Object.keys(bookingDetails).length > 0 && (
//               <ButtonText onClick={handleResetBookingDetails}>
//                 Change Booking Details
//               </ButtonText>
//             )}
//           </Row>
//           <BookingForm
//             data={availabilityData.availableGuestRooms}
//             setBookingDetails={setBookingDetails}
//             bookingDetails={bookingDetails}
//           />
//         </Row>
//       )}

//       {Object.keys(bookingDetails).length > 0 && (
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h3">Add Guest Details</Heading>
//             {Object.keys(guestDetails).length > 0 && (
//               <ButtonText onClick={handleResetGuestDetails}>
//                 Change Booking Details
//               </ButtonText>
//             )}
//           </Row>
//           <GuestForm
//             guestDetails={guestDetails}
//             setGuestDetails={setGuestDetails}
//           />
//         </Row>
//       )}

//       {Object.keys(guestDetails).length > 0 && (
//         <Row>
//           <Heading as="h3">Booking Confirmation</Heading>
//           <ConfirmBooking
//             guestData={guestDetails}
//             bookingData={bookingDetails}
//             availibilityData={availabilityData}
//           />
//         </Row>
//       )}
//     </Row>
//   );
// }

// export default CreateBooking;

function CreateBooking() {
  return <div></div>;
}

export default CreateBooking;
