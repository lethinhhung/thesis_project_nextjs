import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { updateProfileAPI } from "@/lib/services/user.service";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {
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

    const form = await req.formData();

    // Call backend API to get profile
    const response = await updateProfileAPI(token?.accessToken || "", form);
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
