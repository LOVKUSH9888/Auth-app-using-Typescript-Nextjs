import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfull",
      success: true,
      data: null,
    });

    // clearing the cookie token to loggedOut
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
