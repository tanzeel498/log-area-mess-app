import supabase, { supabaseUrl } from "./supabase";

export async function getGuestRooms() {
  const { data, error } = await supabase.from("guest-rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Guest Rooms could not be loaded!");
  }

  return data;
}

export async function createUpdateGuestRoom(newGuestRoom, id) {
  // having id will determine if it's create or edit(id exitst)
  const hasImagePath = typeof newGuestRoom.image === "string";
  let imageName = undefined;
  if (!hasImagePath) {
    imageName = `${Math.round(Math.random() * 100000000)}-${
      newGuestRoom.image.name
    }`.replaceAll("/", "");
  }

  const imagePath = hasImagePath
    ? newGuestRoom.image
    : `${supabaseUrl}/storage/v1/object/public/guest-room-images/${imageName}`;

  if (!hasImagePath) {
    // 1.Uploading the image
    const { error: imageUploadError } = await supabase.storage
      .from("guest-room-images")
      .upload(imageName, newGuestRoom.image);

    if (imageUploadError) {
      console.error(imageUploadError);
      throw new Error("Guest Room image could not be uploaded!");
    }
  }

  // will only upload the Guest Rooms data once there is no error uploading the image
  let query = supabase.from("guest-rooms");
  if (id) {
    // edit Guest room case
    query = query.update({ ...newGuestRoom, image: imagePath }).eq("id", id);
  } else {
    // create Guest room case
    query = query.insert([{ ...newGuestRoom, image: imagePath }]);
  }
  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteGuestRoom(id) {
  const { data, error } = await supabase
    .from("guest-rooms")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest Room could not be deleted!");
  }

  return data;
}
