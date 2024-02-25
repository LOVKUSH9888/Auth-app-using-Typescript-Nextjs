import { dbConnection } from "@/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
dbConnection();

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: "Get route fetched data",
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
