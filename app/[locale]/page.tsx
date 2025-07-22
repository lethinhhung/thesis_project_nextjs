import Nav from "@/components/landing-page-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Brain, Smartphone, NotebookPen } from "lucide-react";

export const metadata = {
  title: "Notebok",
  description: "Landing page",
};

export default function Landing() {
  const t = useTranslations("landing");
  return (
    <div className="w-full h-full">
      <Nav className="sticky top-0 z-50 bg-background" />

      {/* Hero Section with Cover Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cover.jpg"
            alt="Learning platform background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 py-8 md:px-6 md:py-12 flex flex-col w-full min-h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="bg-white/10 text-white border-white/20"
            >
              {t("development")}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero_title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl lg:text-2xl">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="px-8">
                <Link href="/login">{t("get_started")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Link href="#about">{t("learn_more")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("features_title")}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
              {t("features_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-dashed">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("ai_powered_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("ai_powered_description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <NotebookPen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("note_taking_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("note_taking_description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("mobile_friendly_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("mobile_friendly_description")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("about_title")}
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
              {t("about_description")}
            </p>

            <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mt-12">
              <h3 className="text-2xl font-semibold mb-4">
                {t("mission_title")}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t("mission_description")}
              </p>

              {/* Thesis Information */}
              <div className="border-t pt-8">
                <h4 className="text-xl font-semibold mb-6">
                  {t("thesis_info_title")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      {t("thesis_author")}:
                    </p>
                    <p className="text-muted-foreground">Lê Thịnh Hưng</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      {t("thesis_supervisor")}:
                    </p>
                    <p className="text-muted-foreground">Châu Xuân Phương</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      {t("thesis_university")}:
                    </p>
                    <p className="text-muted-foreground">{t("ctu")}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      {t("thesis_year")}:
                    </p>
                    <p className="text-muted-foreground">2024-2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("cta_title")}
            </h2>
            <p className="text-xl opacity-90">{t("cta_description")}</p>
            <Button asChild size="lg" variant="secondary" className="px-8">
              <Link href="/register">{t("get_started")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
