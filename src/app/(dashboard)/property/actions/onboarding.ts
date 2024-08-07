"use server";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

// export async function getHotels() {
//   const supabase = createClient(cookies());
//   const session = await getServerSession(authOptions);
//   console.log("session1:", session);
//   try {
//     const { data, error } = await supabase.from("hotel").select("*").eq('id',session?.user.hotel_id).single(); 
//     if (error) {
//       return { success: false, error, message: error?.message };
//     }
//     return { success: true, data, message: "Hotel fetched successfully" };
//   } catch (err) {
//     return { success: false, error: err, message: "Internal server error!" };
//   }
// }