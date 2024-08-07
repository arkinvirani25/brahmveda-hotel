import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest){
    const ip = req.ip;
    console.log("ip:", ip);
    return NextResponse.json(
        { ip },
        { status: 200 }
      );
}
