import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  title: {
    default: "Arvin Baghari Edubas | Web Developer & Software Engineer",
    template: "%s | Arvin Baghari Edubas",
  },
  description:
    "Professional portfolio of Arvin Baghari Edubas, a Web Developer and Software Engineer specializing in modern web technologies, full-stack development, and enterprise solutions.",
  keywords: [
    "Web Developer",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Arvin Baghari Edubas" }],
  creator: "Arvin Baghari Edubas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arvinedubas.dev",
    siteName: "Arvin Baghari Edubas Portfolio",
    title: "Arvin Baghari Edubas | Web Developer & Software Engineer",
    description:
      "Professional portfolio of Arvin Baghari Edubas, a Web Developer and Software Engineer specializing in modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvin Baghari Edubas | Web Developer & Software Engineer",
    description:
      "Professional portfolio of Arvin Baghari Edubas, a Web Developer and Software Engineer.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
