"use server";

import { ISignUp } from "@/interface";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";

export const signUp = async (values: ISignUp) => {
  const supabase = createClient(cookies());
  if (values) {
    // Create a hotel
    // const { data: hotelData, error: hotelError } = await supabase
    //   .from("hotel")
    //   .insert([{ contact_email: values?.email }])
    //   .select()
    //   .single();
    // console.log("hotelError", hotelError);
    // if (hotelError) {
    //   return { error: hotelError.message };
    // }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: values?.email,
      password: values?.password,
      // options: {
      //   data: {
      //     hotel_id: hotelData.id,
      //   },
      // },
    });
    // console.log("signUpError", signUpError);
    if (signUpError) {
      return { error: signUpError.message };
    }
    // console.log("signUpData", signUpData);
    // Associate the user with the hotel
    // const userId = signUpData?.user?.id;
    // console.log("userId", userId);

    // const { error: userError } = await supabase
    //   .from("users")
    //   .insert([{ id: userId, email: values.email, user_type: "hotel", hotel_id: hotelData.id }]);

    // if (userError) {
    //   return { error: userError.message };
    // }

    return {
      id: signUpData?.user?.id,
      email: signUpData?.user?.email,
    };
  }
};

// export const signUp = async (email: string) => {
//   const supabase = createClient(cookies());
//   const { data, error } = await supabase.auth.signInWithOtp({
//     email,
//     options: {
//       emailRedirectTo: "http://localhost:3000/callback",
//     },
//   });
//   console.log("error:", error);
//   console.log("data:", data);
// };
