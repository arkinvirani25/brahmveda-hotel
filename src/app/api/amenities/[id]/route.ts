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

    const { data, error } = await supabase.from("hotel").select("*").eq("id", id).single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        data: {
          hotel_facilities: JSON.parse(data.hotel_facilities),
        },
        message: "Hotel amenities found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
