import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, password, email }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return user;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  let dataToUpdate; // we have made two seperate forms for Name and password so we can receive only 1 at a time
  if (password) dataToUpdate = { password };
  else if (fullName) dataToUpdate = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(dataToUpdate);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // Addressing the avatar if uploaded
  // 1. uploading the image to storage --> avatars bucket
  const fileName = `avatar-${data.user.id}-${avatar.name}`;
  const { error: imageUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (imageUploadError)
    if (imageUploadError.message !== "The resource already exists")
      throw new Error(imageUploadError.message);

  // 2. Updating this new image src into the user data
  const { data: userUpdateData, error: userUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (userUpdateError) throw new Error(imageUploadError.message);

  return userUpdateData;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
