import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/app/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fabio Zanetti | Ingegneria Informatica @ Bologna",
  description:
    "Portfolio personale di Fabio Zanetti, studente al 2° anno di Ingegneria Informatica a Bologna. Progetti software, sistemi operativi, algoritmi e sviluppo web moderno.",
  keywords: [
    "Fabio Zanetti",
    "Ingegneria Informatica",
    "Bologna",
    "UniBo",
    "Portfolio",
    "Software Engineer",
    "C",
    "C++",
    "Java",
    "Python",
    "Next.js",
    "Tirocinio",
  ],
  authors: [{ name: "Fabio Zanetti", url: "https://fabiozanetti.it" }],
  creator: "Fabio Zanetti",
  metadataBase: new URL("https://fabiozanetti.it"),
  openGraph: {
    title: "Fabio Zanetti | Ingegneria Informatica @ Bologna",
    description:
      "Portfolio personale di Fabio Zanetti. Progetti, competenze tecniche e contatti per opportunità di tirocinio.",
    url: "https://fabiozanetti.it",
    siteName: "Fabio Zanetti Portfolio",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabio Zanetti | Ingegneria Informatica",
    description:
      "Portfolio di Fabio Zanetti, studente di Ingegneria Informatica a Bologna.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090a0f] text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 font-sans`}
      >
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
