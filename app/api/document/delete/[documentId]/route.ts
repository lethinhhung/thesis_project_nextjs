import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { deleteDocumentAPI } from "@/lib/services/document.service";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
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

    const documentId = (await params).documentId;
    if (!documentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Document ID is required",
          error: {
            code: "INVALID_DOCUMENT_ID",
            details: "Document ID is required",
          },
        },
        { status: 400 }
      );
    }

    const response = await deleteDocumentAPI(
      token?.accessToken || "",
      documentId
    );

    if (response.status === 201 || response.status === 200) {
      if (response.data.success) {
        return NextResponse.json(
          {
            success: true,
            message: response.data.message,
            data: response.data.data,
          },
          { status: 200 }
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
        message: "Unexpected response from document API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error deleting document:", error);
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
