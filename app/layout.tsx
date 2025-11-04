import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Weather App - Current Weather for Cities Worldwide",
    template: "%s | Weather App",
  },
  description:
    "View real-time weather conditions for cities around the world. Track temperature, humidity, wind speed, and more. Add favorites and notes for your favorite cities.",
  keywords: [
    "weather",
    "weather app",
    "current weather",
    "temperature",
    "forecast",
    "cities",
    "worldwide weather",
  ],
  authors: [{ name: "Weather App Team" }],
  creator: "Weather App",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weather-app.com",
    title: "Weather App - Current Weather for Cities Worldwide",
    description:
      "View real-time weather conditions for cities around the world",
    siteName: "Weather App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather App - Current Weather for Cities Worldwide",
    description:
      "View real-time weather conditions for cities around the world",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
