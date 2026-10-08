import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  RevealObserver,
  RouteCurtain,
  ScrollProgress,
} from "@/components/motion";
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
  metadataBase: new URL("https://abedubas.dev"),
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
  // No og:url here: every page inherits this block, so a fixed URL would
  // claim the home page for all of them. Crawlers use the page's own URL.
  openGraph: {
    type: "website",
    locale: "en_US",
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
    // data-scroll-behavior lets Next pause smooth scrolling during navigation
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Before paint: apply the theme, and opt into motion (`.motion`)
            unless reduced motion is requested. If RevealObserver hasn't
            mounted 3 s later, drop `.motion` so no content stays hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!window.__revealReady)d.classList.remove('motion')},3000)}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <RevealObserver />
          <RouteCurtain />
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
