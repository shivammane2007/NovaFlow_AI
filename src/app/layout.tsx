import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaFlow AI — Build smarter. Launch faster.",
  description:
    "NovaFlow AI helps teams automate workflows using intelligent AI agents and connected automation systems.",
  keywords: [
    "AI workflow automation",
    "AI agents",
    "automation platform",
    "AI productivity tools",
    "workflow automation",
    "AI SaaS platform",
  ],
  authors: [{ name: "NovaFlow AI Team" }],
  creator: "NovaFlow AI",
  publisher: "NovaFlow AI",
  icons: {
    icon: "/logo/novaflow_logo.jpeg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NovaFlow AI",
    description: "Build smarter. Launch faster.",
    url: "https://novaflow.ai",
    siteName: "NovaFlow AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NovaFlow AI automation platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaFlow AI",
    description: "Build smarter. Launch faster.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://novaflow.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "NovaFlow AI",
              description:
                "NovaFlow AI helps teams automate workflows using intelligent AI agents.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://novaflow.ai",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
