import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getSystemStatsAPI } from "@/lib/services/user.service";
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

    // Call backend API to get system stats
    const response = await getSystemStatsAPI(token?.accessToken || "");

    if (response.status === 201 || response.status === 200) {
      if (response.data.success) {
        return NextResponse.json(
          {
            success: true,
            message: response.data.message,
            data: response.data.data,
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: response.data.message,
            error: {
              code: response.data.error.code,
              details: response.data.error.details,
            },
          },
          { status: response.data.error.code }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unexpected response from system stats API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching system stats:", error);
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
