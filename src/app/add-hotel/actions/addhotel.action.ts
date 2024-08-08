"use server";

import { IHotelMedia } from "@/interface";
import { createClient } from "@/lib/supabase/supabaseServer";
import { AItogether, convertToSlug } from "@/lib/utils";
import axios from "axios";
import { cookies } from "next/headers";
import os from "os";

export const fetchHotelData = async (url: string) => {
  try {
    const response = await fetch(`http://192.168.10.94:5000/api/hotel?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error);
    }
    return { data: responseData, message: "Hotel Details imported successfully", success: true };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export const insertHotelMedia = async (data: IHotelMedia) => {
  try {
    const supabase = createClient(cookies());
    await supabase.from("hotel_media").insert(data);
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export const updateHotel = async (data: any) => {
  try {
    const supabase = createClient(cookies());
    const aiResult = await AItogether(data.address);
    const address = aiResult && JSON.parse(aiResult[0]?.message?.content || "");
    const country = await getIdByName("geo_country", address.country);
    const ipAddress = await getIPv4Address();

    const hotelPayload = {
      name: data.name,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      address: address.address || "",
      country,
      state: address.state,
      city: address.city,
      updated_ip: ipAddress,
      updated_at: new Date(),
      postal_code: address.postal_code || "",
      slug: convertToSlug(data.name),
      fine_print: data.fine_print,
      meta_title: data.meta_data.meta_title,
      meta_description: data.meta_data.meta_description,
      meta_keywords: data.meta_data.meta_keywords,
      hotel_facilities: JSON.stringify(data.hotel_facilities),
      hotel_rules: JSON.stringify(data.hotel_rules),
      hotel_most_popular_facilities: JSON.stringify(data.hotel_most_popular_facilities),
      surroundings: JSON.stringify(data.surroundings),
      restaurants: JSON.stringify(data.restaurants),
      total_reviews: data.total_reviews,
      hotel_score: data.hotel_score,
      checkIn_time: data.hotel_rules.find((rule: any) => rule.title === "Check-in").content,
      checkOut_time: data.hotel_rules.find((rule: any) => rule.title === "Check-out").content,
    };

    const { data: hotelData, error } = await supabase
      .from("hotel")
      .update(hotelPayload)
      .eq("id", data.hotel_id)
      .select();
    console.error("error => ", error);

    if (error) {
      return { message: error.message, success: false };
    }

    for (const faq of data.hotel_faqs) {
      const faqPayload = {
        hotel_id: data.hotel_id,
        question: faq.question,
        answer: faq.answer,
      };
      const { error } = await supabase.from("hotel_faqs").insert(faqPayload).select();
      console.error("error => ", error);
    }

    for (const review of data.hotel_reviews) {
      const reviewPayload = {
        hotel_id: data.hotel_id,
        review: review.review,
        country: review.country,
        name: review.name,
      };
      const { error } = await supabase.from("hotel_reviews").insert(reviewPayload).select();
      console.error("error => ", error);
    }
    return { success: true, data: hotelData, message: "Hotel Added successfully" };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export async function insertRoomDetails(data: any) {
  try {
    const supabase = createClient(cookies());
    const roomPayload = {
      hotel_id: data.hotel_id,
      bed_type: JSON.stringify(data.bed_types),
      room_facilities: JSON.stringify(data.facilities),
      description: data.description,
      smoking_policy: data.smoking_policy,
      room_size: data.size,
      guests_limit: data.number_of_guests,
      room_name: data.room_name,
    };
    const { data: roomDetails, error } = await supabase
      .from("hotel_room")
      .insert(roomPayload)
      .select();
    if (error) {
      return { message: error.message, success: false };
    }
    return { success: true, data: roomDetails, message: "Room Added successfully" };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
}

export async function getIdByName(tableName: string, searchText: string) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from(tableName)
    .select("id")
    .eq("name", searchText)
    .single();

  if (error) {
    return null;
  }
  if (data) {
    return data.id;
  }
}

export async function getIPv4Address() {
  const interfaces = os.networkInterfaces();
  const ipAddress = [];
  for (let iface in interfaces) {
    if (interfaces[iface]) {
      for (let alias of interfaces[iface]) {
        if (alias.family === "IPv4" && !alias.internal) {
          ipAddress.push(alias.address);
        }
      }
    }
  }
  return ipAddress ? ipAddress[0] : undefined;
}

// if (hotelDetails) {
//   for (const category of data.hotel_facilities) {
//     const categoryId = await getIdByName("facilities_category", category.category_name);
//     if (!categoryId) continue;
//     console.log("category:", category.category_name);

//     for (const facilityName of category.facilities) {
//       const facilities_id = await getIdByName("facilities", facilityName);
//       if (!facilities_id) continue;
//       await supabase.from("hotel_facilities").insert({
//         hotel_id: hotelDetails.id,
//         facilities_id,
//       });
//     }
//   }
// }
