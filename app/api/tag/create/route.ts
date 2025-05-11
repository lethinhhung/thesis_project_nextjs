import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createTagAPI } from "@/lib/services/tag.service";

export async function POST(req: NextRequest) {
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

    const { title } = await req.json();
    // Call backend API to get profile
    const response = await createTagAPI(token?.accessToken || "", title);
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
        message: "Unexpected response from tag API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching tag:", error);
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
