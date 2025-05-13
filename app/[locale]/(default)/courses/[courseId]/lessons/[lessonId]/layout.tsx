import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getLessonAPI } from "@/lib/services/lesson.service";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  // read route params
  const { lessonId } = await params;

  // Get session to access the token
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken || "";

  const response = await getLessonAPI(accessToken, lessonId);

  return {
    title: response?.data?.data?.title || "Lesson",
    description: response?.data?.data?.description || "Lesson Description",
  };
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
