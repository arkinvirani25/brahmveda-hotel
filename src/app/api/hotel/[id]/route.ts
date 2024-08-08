import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(cookies());
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("hotel")
      .select(
        `
      *,
      hotel_room (
        smoking_policy,
        guests_limit,
        room_name,
        bed_type,
        room_facilities
      ),
      hotel_faqs (
        question,
        answer
      ),  
      hotel_reviews (
        name,
        country,
        review
      )
    `
      )
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        data: {
          ...data,
          hotel_facilities: JSON.parse(data.hotel_facilities),
          hotel_rules: JSON.parse(data.hotel_rules),
          hotel_most_popular_facilities: JSON.parse(data.hotel_most_popular_facilities),
          surroundings: JSON.parse(data.surroundings),
          restaurants: JSON.parse(data.restaurants),
          hotel_room: data?.hotel_room?.map((room: any) => {
            return {
              ...room,
              room_facilities: JSON.parse(room.room_facilities),
              bed_type: JSON.parse(room.bed_type),
            };
          }),
        },
        message: "Hotel found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
