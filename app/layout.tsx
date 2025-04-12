"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning className="scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[Geist]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            theme={
              theme === "light" || theme === "dark" || theme === "system"
                ? theme
                : undefined
            }
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
