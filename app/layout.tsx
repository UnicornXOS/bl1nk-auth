import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Geist } from "next/font/google"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  title: "YOYO – AI Version Control for Vibe Coding | Instantly Undo AI Mistakes",
  description:
    "AI coding doesn't have an undo button—until now. YOYO snapshots your code before AI breaks it. Instantly save, preview, and restore your work. Works with Cursor, Windsurf, VS Code, Claude Code, and OpenAI Codex.",
  keywords:
    "AI version control, vibe coding, undo AI mistakes, AI code backup, AI snapshot tool, Cursor extension, Windsurf extension, VS Code extension, Claude Code, OpenAI Codex",
  authors: [{ name: "YOYO Team" }],
  creator: "YOYO",
  publisher: "YOYO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://runyoyo.com",
    siteName: "YOYO - AI Version Control",
    title: "YOYO – AI Version Control for Vibe Coding",
    description:
      "AI coding doesn't have an undo button—until now. YOYO lets you snapshot, preview, and restore your code instantly so you can keep vibing. Free download.",
    images: [
      {
        url: "https://runyoyo.com/images/og-new.jpeg",
        width: 1200,
        height: 630,
        alt: "YOYO AI Version Control timeline with instant code restore",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOYO – AI Version Control for Vibe Coding",
    description:
      "Never lose code to bad AI prompts again. YOYO snapshots your code so you can undo any mistake in one click. Free download.",
    images: ["https://runyoyo.com/images/og-new.jpeg"],
    creator: "@jackjack_eth",
    site: "@yoyo_dev",
  },
  alternates: {
    canonical: "https://runyoyo.com",
  },
  category: "Technology",
  classification: "Developer Tools",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  generator: "Next.js",
  applicationName: "YOYO - AI Version Control",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geistSans.className}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/core@latest/dist/geist-ui.css" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Software Application JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "YOYO - AI Version Control",
              description:
                "YOYO lets developers snapshot, preview, and restore their code before AI breaks it. Instantly undo mistakes and keep your workflow clean.",
              url: "https://runyoyo.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Windows, macOS, Linux",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "YOYO",
                url: "https://runyoyo.com",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "2000",
              },
              featureList: [
                "AI mistake recovery and rollback",
                "One-click version restore",
                "Cross-IDE compatibility (Cursor, Windsurf, VS Code, Claude Code, OpenAI Codex)",
                "Real-time code backup",
                "AI search across code versions",
                "Vibe coding workflow optimization",
              ],
              audience: {
                "@type": "Audience",
                audienceType: "AI developers, software engineers using AI assistants, vibe coders",
              },
            }),
          }}
        />

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "I already use Git. Why would I need YoYo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Git is great for commits. YoYo is for everything before that — messy AI edits, experiments, prompts gone wrong. It gives you a safety net without bloating your commit history.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — there's a generous free tier. Pro and Team plans coming soon.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will this mess up my Git repo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nope. YoYo keeps everything separate from your Git repo. No staged files. No surprise commits. Your .git/ stays clean and untouched.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where is my version history stored?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Your full version history lives on your machine — not in the cloud.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does YoYo secure AI usage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "YoYo uses fast, secure LLM providers like Groq, with zero data retention. Your code is encrypted in transit using TLS 1.2+ and never stored or used for training. We don't keep logs. We don't keep copies.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does it work with branches?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — beautifully. Each Git branch has its own version timeline in YoYo. Snapshots stay scoped to your work.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Video Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "YOYO AI Version Control - Save, Preview, Restore Demo",
              description:
                "See how YOYO lets you instantly save your code progress, preview any past version, and restore with one click when AI prompts go wrong. Perfect for vibe coding workflows.",
              thumbnailUrl: "https://runyoyo.com/images/save-thumbnail.jpeg",
              uploadDate: "2024-12-01",
              duration: "PT45S",
              contentUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yoyo-save-2-DUbUp5aKE9GtNY9Diok2eG6SW2qHCX.mp4",
              embedUrl: "https://runyoyo.com",
              publisher: {
                "@type": "Organization",
                name: "YOYO",
                logo: {
                  "@type": "ImageObject",
                  url: "https://runyoyo.com/android-chrome-512x512.png",
                },
              },
              keywords: "AI version control, vibe coding, code backup, AI mistakes, developer tools",
              category: "Technology",
            }),
          }}
        />

        {/* Additional Video Schema for AI Search Demo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "YOYO Agentic AI Search - Query Your Code History",
              description:
                "YOYO's AI search lets you ask questions about your entire coding timeline across versions, branches, and editors. Find any change instantly with natural language queries.",
              thumbnailUrl: "https://runyoyo.com/images/preview-thumbnail.jpeg",
              uploadDate: "2024-12-01",
              duration: "PT60S",
              contentUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favorites-FFCUeeEFzfxDBIhgGACi7YGpYQZbnU.mp4",
              embedUrl: "https://runyoyo.com",
              publisher: {
                "@type": "Organization",
                name: "YOYO",
                logo: {
                  "@type": "ImageObject",
                  url: "https://runyoyo.com/android-chrome-512x512.png",
                },
              },
              keywords: "AI search, code history, version control, AI assistant, developer productivity",
              category: "Technology",
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
