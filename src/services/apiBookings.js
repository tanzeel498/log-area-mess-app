import supabase from "./supabase";
import { getToday, getDayEnd } from "../utils/helpers";

import { ROWS_PER_PAGE } from "../utils/constants";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id,created_at, startDate, endDate, numNights, numGuests, status, totalPrice, guest-rooms(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) {
    filter.forEach((el) => {
      query = query[el.method || "eq"](el.field, el.value);
    });
  }

  // SORT
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * ROWS_PER_PAGE;
    const to = page * ROWS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded!");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guest-rooms(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function checkRoomsAvailability({ startDate, endDate }) {
  // this will return bookings that exist between startDate and endDate
  const { data: existingBookings, error } = await supabase
    .from("bookings")
    .select("guestRoomId, startDate, endDate")
    .or(`startDate.gte.${startDate},endDate.lte.${getDayEnd(endDate)}`)
    .lte("startDate", getDayEnd(endDate))
    .gte("endDate", startDate);

  if (error) {
    console.error(error);
    throw new Error("Checking Availability failed!");
  }

  const existingGuestRoomIds = existingBookings
    .map((booking) => booking.guestRoomId)
    .join(",");

  // postgres accept array like this "(1, 3, 4)"
  // getting all the guest rooms whose bookings doesn't exist
  const { data: availableGuestRooms, error: guestRoomsError } = await supabase
    .from("guest-rooms")
    .select("id, name, regularPrice, discount")
    .not("id", "in", `(${existingGuestRoomIds})`);

  if (guestRoomsError) {
    console.error(error);
    throw new Error("Checking Availability failed!");
  }

  return { availableGuestRooms, startDate, endDate };
}

export async function getGuest(serviceNumber) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("serviceNumber", serviceNumber)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest Not found!");
  }

  return data;
}

export async function createGuest(guestData) {
  const { data, error } = await supabase
    .from("guests")
    .insert([guestData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest creation Failed");
  }

  return data.at(0);
}

export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking creation Failed");
  }

  return data.at(0);
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example. data: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
