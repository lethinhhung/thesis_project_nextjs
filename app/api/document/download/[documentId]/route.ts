import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { downloadDocumentAPI } from "@/lib/services/document.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
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

    const response = await downloadDocumentAPI(
      token?.accessToken || "",
      documentId
    );

    if (response.status === 201 || response.status === 200) {
      // Convert to array buffer directly from response data since it's already in that format
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      // Get filename from content-disposition header
      const contentDisposition = response.headers["content-disposition"];
      let filename = "document";

      if (contentDisposition) {
        const filenameMatch = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
          contentDisposition
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, "");
        }
      }

      // Return file with proper headers
      return new Response(blob, {
        headers: {
          "Content-Type":
            response.headers["content-type"] || "application/octet-stream",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": blob.size.toString(),
          "Cache-Control": "no-cache",
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unexpected response from course API",
        error: {
          code: "UNEXPECTED_RESPONSE",
          details: `Status code: ${response.status || 500}`,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching course:", error);
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
