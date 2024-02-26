import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userSchema";
import { dbConnection } from "@/config/dbConnection";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = new User(payload);

    await newUser.save();

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        data: {
          payload,
        },
      },
      { status: 201 }
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
