import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootProviders from "@/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const raleway = localFont({
  src: [
    {
      path: "./fonts/raleway/Raleway-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/raleway/Raleway-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/raleway/Raleway-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/raleway/Raleway-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/raleway/Raleway-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/raleway/Raleway-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/raleway/Raleway-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-raleway",
});
export const metadata: Metadata = {
  title: "Crokto",
  description: "The Decentralised Course Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} font-sans antialiased`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
