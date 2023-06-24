import supabase, { supabaseUrl } from "./supabase";

export async function getGuestRooms() {
  const { data, error } = await supabase.from("guest-rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Guest Rooms could not be loaded!");
  }

  return data;
}
