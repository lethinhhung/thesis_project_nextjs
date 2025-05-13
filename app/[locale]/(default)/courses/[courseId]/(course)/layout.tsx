import CourseLayout from "@/components/layouts/course";
import { getCourseAPI } from "@/lib/services/course.service";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken || "";
  const response = await getCourseAPI(accessToken, params.courseId);

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

function Course({ children }: { children: React.ReactNode }) {
  return <CourseLayout>{children}</CourseLayout>;
}

export default Course;
