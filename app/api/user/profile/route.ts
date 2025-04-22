import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getProfileAPI } from "@/lib/services/user.service";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession();

    const token = await getToken({ req });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: {
            code: "UNAUTHORIZED",
            details: "User not authenticated",
          },
        },
        { status: 401 }
      );
    }

    // Call backend API to get profile
    const response = await getProfileAPI(token?.accessToken || "");
    return NextResponse.json(response?.data);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: {
          code: "SERVER_ERROR",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
