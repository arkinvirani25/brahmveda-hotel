"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";

export const fetchTemplateData = async () => {
  const supabase = createClient(cookies());
  try {
    const { data, error } = await supabase.from("template").select("id, image, name");
    if (error) {
      return { success: false, error, message: error?.message };
    }
    return { success: true, data, message: "Template fetched successfully" };
  } catch (err) {
    return { success: false, error: err, message: "Internal server error!" };
  }
};

export const insertHotelData = async (hotelData: { template_id: string }) => {
  const supabase = createClient(cookies());
  try {
    const { data, error } = await supabase.from("hotel").insert(hotelData).select();
    if (error) {
      return { success: false, error, message: error?.message };
    }
    return { success: true, data, message: "Template Selected successfully" };
  } catch (err) {
    return { success: false, error: err, message: "Internal server error!" };
  }
};
