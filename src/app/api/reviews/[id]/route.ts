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
          hotel_score: data.hotel_score,
          hotel_reviews: data.hotel_reviews,
        },
        message: "Hotel review found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
