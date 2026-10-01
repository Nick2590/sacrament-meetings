import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

function getMetadataBase(): URL {
  const vercelUrl = process.env.VERCEL_URL?.trim();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const baseUrl = vercelUrl ?? appUrl ?? "http://localhost:3000";
  const normalizedUrl = /^https?:\/\//i.test(baseUrl)
    ? baseUrl
    : `https://${baseUrl}`;

  return new URL(normalizedUrl);
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description:
    "Plan Desert Ridge Ward sacrament meeting schedules and programs, and review meeting details, speakers, and music.",
  openGraph: {
    title: "Sacrament Meeting Planner",
    description:
      "Plan Desert Ridge Ward sacrament meeting schedules and programs, and review meeting details, speakers, and music.",
    type: "website",
    images: [
      {
        url: "/meeting-planner.svg",
        width: 640,
        height: 480,
        alt: "Illustration of a printed sacrament meeting program",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
