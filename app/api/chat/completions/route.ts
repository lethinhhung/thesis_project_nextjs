import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createChatCompletionAPI } from "@/lib/services/ai.service";

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

    const { messages, isUseKnowledge, model, courseId, _id } = await req.json();

    if (!messages) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content format",
          error: {
            code: "INVALID_CONTENT",
            details: "Content is required and must be in correct format",
          },
        },
        { status: 400 }
      );
    }

    const response = await createChatCompletionAPI(
      token?.accessToken || "",
      messages,
      isUseKnowledge || false,
      model || "llama-3.3-70b-versatile",
      courseId || undefined,
      _id || undefined
    );

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
        message: "Unexpected response from chat API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching chat:", error);
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
