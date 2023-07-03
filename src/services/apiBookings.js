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
