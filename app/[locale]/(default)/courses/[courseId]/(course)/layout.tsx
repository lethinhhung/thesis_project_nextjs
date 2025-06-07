import { getCourseAPI } from "@/lib/services/course.service";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import CourseLayout from "@/components/layouts/course";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken || "";
  const { courseId } = await params;
  const response = await getCourseAPI(accessToken, courseId);

  const emoji = response?.data?.data?.customization.emoji || "📘";
  const svgFavicon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <text y="96" font-size="96">${emoji}</text>
    </svg>
  `;
  const base64Favicon = `data:image/svg+xml;base64,${Buffer.from(
    svgFavicon
  ).toString("base64")}`;

  return {
    title: response?.data?.data?.title || "Course",
    description: response?.data?.data?.description || "Course Description",
    icons: {
      icon: base64Favicon,
    },
  };
}

async function Course({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  try {
    const res = await getCourseAPI(session?.accessToken || "", courseId);
    const course = res.data.data;

    return <CourseLayout course={course}>{children}</CourseLayout>;
  } catch (error) {
    console.error("Error fetching course:", error);
    notFound();
  }
}

export default Course;
