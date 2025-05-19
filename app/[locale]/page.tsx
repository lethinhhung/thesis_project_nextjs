import Nav from "@/components/landing-page-nav";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Notebok",
  description: "Landing page",
};

export default function Landing() {
  const t = useTranslations("landing");
  return (
    <div className="w-full h-full">
      <Nav />
      <div className="px-2 py-4 md:p-6 flex flex-col w-full min-h-[calc(100dvh-64px)]">
        <div className="flex flex-col items-center justify-center space-y-4 m-auto">
          <div className="p-4 md:p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Notebok
                </h1>
                <p className="mx-auto max-w-175 text-muted-foreground md:text-xl">
                  {t("description")}
                </p>
                <Badge variant={"destructive"}>{t("development")}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
