import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaviyarasan C — Full Stack Developer",
  icons: {
    icon: "/logo.jpeg",
  },
  description:
    "Full Stack Developer specializing in AI integration, Next.js, and Flutter. Built Smart Uzhavar and Travid. Available for freelance and placement.",
  keywords: [
    "Kaviyarasan",
    "Full Stack Developer",
    "Tamil Nadu",
    "Next.js",
    "Flutter",
    "AI Integration",
    "Freelance Developer",
    "Coimbatore",
  ],
  openGraph: {
    title: "Kaviyarasan C — Full Stack Developer",
    description: "Walk through my Tamil Nadu village portfolio",
    url: "https://kaviyarasan-portfolio.vercel.app",
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground grain">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
