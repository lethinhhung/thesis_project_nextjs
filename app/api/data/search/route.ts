import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { searchAPI } from "@/lib/services/data.service";

export async function GET(req: NextRequest) {
  try {
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

    // Get search parameters from URL
    const searchParams = req.nextUrl.searchParams;

    const params = {
      query: searchParams.get("query") || "",
    };

    const response = await searchAPI(token?.accessToken || "", params);

    if (response.status === 200) {
      if (response.data.success) {
        return NextResponse.json({
          success: true,
          message: response.data.message,
          data: response.data.data,
        });
      }
      return NextResponse.json(
        {
          success: false,
          message: response.data.message,
          error: response.data.error,
        },
        { status: response.data.error.code }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unexpected response from data API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error searching data:", error);
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
