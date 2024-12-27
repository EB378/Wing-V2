import { createClient } from '@/utils/supabase/server';

export default async function bookings() {
  const supabase = await createClient();
  const { data: bookings } = await supabase.from("bookings").select();

  return <pre>{JSON.stringify(bookings, null, 2)}</pre>
}