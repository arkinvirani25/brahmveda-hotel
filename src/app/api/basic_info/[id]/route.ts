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
      geo_country (
        name
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
          name: data.name,
          address: data.address,
          description: data.description,
          city: data.city,
          country: data.geo_country.name,
          state: data.state,
          checkIn_time: data.checkIn_time,
          checkOut_time: data.checkOut_time,
          hotel_score: data.hotel_score,
          contact_email: data.contact_email,
          contact_number: data.contact_number,
        },
        message: "Hotel Basic Info found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
