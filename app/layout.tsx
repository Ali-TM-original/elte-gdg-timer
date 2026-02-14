"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { KBarProvider } from "kbar";
import "./globals.css";
import CommandBar from "@/components/CommandBar";
import { TimerProvider } from "../components/context/TimerContext";
import { CustomTimeModalProvider } from "@/components/context/CustomTimeModalContext";
import RegisterTimerActions from "@/components/utils/RegisterTimerActions";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#6B8BFF]`}
      >
        <KBarProvider options={{ enableHistory: true }}>
          <TimerProvider>
            <CustomTimeModalProvider>
              <RegisterTimerActions />
              <CommandBar />
              {children}
            </CustomTimeModalProvider>
          </TimerProvider>
        </KBarProvider>
      </body>
    </html>
  );
}
