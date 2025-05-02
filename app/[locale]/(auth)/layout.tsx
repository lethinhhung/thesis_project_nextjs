import { DarkModeSwitcher } from "@/components/dark-mode-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import CustomSessionProvider from "@/components/session-provider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session) {
    redirect("/home"); // Nếu đã đăng nhập thì chuyển về trang chủ
  }

  return (
    <CustomSessionProvider session={session}>
      <div className="w-full flex min-h-dvh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <DarkModeSwitcher size={"icon"} />
          <LanguageSwitcher size={"icon"} />
        </div>
      </div>
    </CustomSessionProvider>
  );
}
