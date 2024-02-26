import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userSchema";
import { dbConnection } from "@/config/dbConnection";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({
        message: "User does not exist",
        success: false,
      });
    }

    const isPasswordMatched = await existingUser.comparePassword(password);

    if (!isPasswordMatched) {
      return NextResponse.json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = existingUser.generateAuthToken();

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        data: {
          token,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
