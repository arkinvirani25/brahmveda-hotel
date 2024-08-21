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
        id,
        smoking_policy,
        guests_limit,
        room_name,
        bed_type,
        room_facilities,
        base_price,
        payable_price
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
          hotel_room: data?.hotel_room?.map((room: any) => {
            return {
              ...room,
              room_facilities: JSON.parse(room.room_facilities),
              bed_type: JSON.parse(room.bed_type),
              hotel_room_media: data?.hotel_room_media?.filter(
                (roomMedia: any) => roomMedia.room_id === room.id
              ),
            };
          }),
        },
        message: "Hotel room info found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
