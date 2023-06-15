import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hkifmawlknsexssajxnv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhraWZtYXdsa25zZXhzc2FqeG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQzMzMxNDUsImV4cCI6MjAwOTkwOTE0NX0.T26wrGuKbgDZzS1ftNq31Q52M_erkdXg4HUOgrKfzdA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
