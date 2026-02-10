"use client";
import * as React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { KBarProvider, createAction } from "kbar";
import "./globals.css";
import CommandBar from "@/components/CommandBar";

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
  const initialActions = [
    {
      id: "start_timer",
      name: "Start Timer",
      shortcut: ["s"],
      keywords: "timer start",
      section: "Timer",
      perform: () => console.log("Start timer action performed"),
    },
    {
      id: "stop_timer",
      name: "Stop Timer",
      shortcut: ["b"],
      keywords: "timer stop",
      section: "Timer",
      perform: () => console.log("Stop timer action performed"),
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#6B8BFF]`}
      >
        <KBarProvider
          options={{ enableHistory: true }}
          actions={initialActions}
        >
          <CommandBar />
          {children}
        </KBarProvider>
      </body>
    </html>
  );
}
