"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import { IHotelBasicInfo } from "../_components/BasicInfoForm";
import { getIdByName, getIPv4Address } from "@/app/add-hotel/actions/addhotel.action";

export const updateHotelBasicInformation = async (data: IHotelBasicInfo) => {
  const country_id = await getIdByName("geo_country", data.country);
  const state_id = await getIdByName("geo_state", data.state);
  const city_id = await getIdByName("geo_city", data.city);
  const updated_user_ip = await getIPv4Address();
  try {
    const supabase = createClient(cookies());
    const payload = {
      country_id,
      city_id,
      state_id,
      name: data.propertyName,
      address: data.address,
      postal_code: data.postalCode,
      description: data.description,
      contact_number: data.contact_number,
      facebook_link: data.facebook_link,
      youtube_link: data.youtube_link,
      instagram_link: data.instagram_link,
      checkin_from: data.checkInTime,
      checkout_until: data.checkOutTime,
      logo: data.logo,
      updated_ip: updated_user_ip,
      updated_at: new Date(),
    };
    await supabase
      .from("hotel")
      .update(payload)
      .eq("id", data.id)
      .select();
    // console.log("updatedData:", updatedData);
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export async function getHotelDataById(id: string) {
  const supabase = createClient(cookies());
  try {
    const { data, error } = await supabase
      .from("hotel")
      .select(
        `
        *,
        geo_city (
          name
        ),
        geo_state (
          name
        ),
        geo_country (
          name
        )
      `
      )
      .eq("id", id);

    if (error) {
      return { success: false, error, message: error?.message };
    }
    return { success: true, data, message: "Hotel fetched successfully" };
  } catch (err) {
    return { success: false, error: err, message: "Internal server error!" };
  }
}
