import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ToasterClient from "@/components/toaster-client";
import { getServerSession } from "next-auth";
import CustomSessionProvider from "@/components/session-provider";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  const session = await getServerSession();

  return (
    <html lang={locale} suppressHydrationWarning className="scrollbar">
      <head>
        <meta name="apple-mobile-web-app-title" content="Notebok" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          locale == "en" && "font-[Geist]"
        }`}
      >
        <CustomSessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
            <ToasterClient />
          </ThemeProvider>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
