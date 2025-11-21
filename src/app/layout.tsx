import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "PicAI - AI Image Generator",
  description: "Generate and edit images with AI using PicAI",
  keywords: ["PicAI", "AI", "Image Generation", "Next.js", "TypeScript"],
  authors: [{ name: "PicAI Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "PicAI - AI Image Generator",
    description: "Generate and edit images with AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PicAI - AI Image Generator",
    description: "Generate and edit images with AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
