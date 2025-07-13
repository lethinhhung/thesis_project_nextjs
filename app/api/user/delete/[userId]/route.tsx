import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { deleteUserAPI } from "@/lib/services/user.service";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
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

    const userId = (await params).userId;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
          error: {
            code: "INVALID_USER_ID",
            details: "User ID is required",
          },
        },
        { status: 400 }
      );
    }

    const response = await deleteUserAPI(token?.accessToken || "", userId);

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
        message: "Unexpected response from user API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
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
