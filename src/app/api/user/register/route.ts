import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //Payload
    const payLoad = await request.json();
    return NextResponse.json(
      {
        message: "Get route fetched data",
        success: true,
        data: payLoad,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
