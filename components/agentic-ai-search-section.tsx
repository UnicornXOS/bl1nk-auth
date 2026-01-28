"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Play } from "lucide-react"
import FeatureVideo from "@/components/feature-video"

interface SearchQuery {
  id: string
  question: string
  videoSrc: string
  fallbackSrc?: string
  category: string
}

const searchQueries: SearchQuery[] = [
  {
    id: "favorites",
    question: "Show my edits to favorites",
    videoSrc: "/videos/favorites.mp4",
    fallbackSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favorites-FFCUeeEFzfxDBIhgGACi7YGpYQZbnU.mp4",
    category: "Feature",
  },
  {
    id: "windsurf",
    question: "Did we update anything using Windsurf?",
    videoSrc: "/videos/update-windsurf.mp4",
    fallbackSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/update-windsurf-2nLOc5uJICad4940kOGQdrwE4nsXdo.mp4",
    category: "Editor",
  },
  {
    id: "darkmode",
    question: "Show me my dark mode refactor?",
    videoSrc: "/videos/dark-mode-search.mp4",
    fallbackSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark-mode-search-mSz6mUD1V8RUdjEfezII84ljPxeCyT.mp4",
    category: "Refactor",
  },
  {
    id: "v9",
    question: "What did I do in v9?",
    videoSrc: "/videos/did-v9.mp4",
    fallbackSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/did-v9-sNyHkh5hs5gfnDH0tYkH15uK5syHUX.mp4",
    category: "Version",
  },
]

interface AgenticAISearchSectionProps {
  onOpenInstall?: () => void
}

export default function AgenticAISearchSection({ onOpenInstall }: AgenticAISearchSectionProps) {
  const [activeQuery, setActiveQuery] = useState(searchQueries[0])
  const [hoveredQuery, setHoveredQuery] = useState<string | null>(null)
  const [videosLoaded, setVideosLoaded] = useState<{ [key: string]: boolean }>({})
  const videoCache = useRef<{ [key: string]: HTMLVideoElement }>({})
  const [isHovering, setIsHovering] = useState(false)

  // Improved video preloading without autoplay
  useEffect(() => {
    const preloadVideos = async () => {
      // Start with the first video (already active)
      setVideosLoaded({ [searchQueries[0].id]: true })

      // Then preload the rest in the background
      for (const query of searchQueries) {
        if (query.id === searchQueries[0].id) continue

        try {
          const video = document.createElement("video")
          video.muted = true
          video.preload = "auto"
          video.playsInline = true
          video.loop = true
          // Remove autoplay - controlled by intersection observer

          videoCache.current[query.id] = video

          video.src = query.videoSrc

          setTimeout(() => {
            setVideosLoaded((prev) => ({ ...prev, [query.id]: true }))
          }, 1000)

          video.onerror = () => {
            if (query.fallbackSrc) {
              video.src = query.fallbackSrc
            }
          }
        } catch (error) {
          console.warn(`Failed to preload video for query ${query.id}:`, error)
        }
      }
    }

    preloadVideos()

    return () => {
      Object.values(videoCache.current).forEach((video) => {
        video.src = ""
        video.load()
      })
      videoCache.current = {}
    }
  }, [])

  const handleQueryClick = (query: SearchQuery) => {
    setActiveQuery(query)
  }

  // Simplified hover handling - no delay
  const handleQueryHover = (query: SearchQuery) => {
    if (isHovering) {
      setHoveredQuery(query.id)
      setActiveQuery(query)
    }
  }

  const handleSectionEnter = () => {
    setIsHovering(true)
  }

  const handleSectionLeave = () => {
    setIsHovering(false)
    setHoveredQuery(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Feature":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
      case "Editor":
        return "bg-orange-500/20 text-orange-300 border-orange-400/30"
      case "Version":
        return "bg-pink-500/20 text-pink-300 border-pink-400/30"
      case "Refactor":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      default:
        return "bg-white/20 text-white border-white/30"
    }
  }

  return (
    <div className="my-24">
      {/* Title and Description */}
      <div className="text-center mb-6 md:mb-12 px-4">
        <h2
          className="mb-4 font-semibold"
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Agentic AI Search
        </h2>
        <p
          className="max-w-2xl mx-auto"
          style={{
            color: "#f5f5f5",
            fontFamily: "GeistMono, monospace",
            fontSize: "clamp(16px, 3vw, 22px)",
            lineHeight: "1.3",
            textAlign: "center",
          }}
        >
          Ask anything. YOYO understands your entire coding timeline — across versions, branches, and editors.
        </p>
      </div>

      {/* Gradient Section with Video */}
      <div className="flex justify-center">
        <div className="gradient-container gradient-blue-red max-w-[1296px] w-full relative">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/35 rounded-[16px]"></div>

          {/* Noise Overlay */}
          <div className="noise-texture"></div>

          {/* Video Section */}
          <div className="relative z-10 pt-4 sm:pt-12 md:pt-16 pb-0 px-4 sm:px-6 md:px-12">
            {/* FIXED ASPECT RATIO CONTAINER */}
            <div className="rounded-t-lg overflow-hidden shadow-2xl max-w-4xl mx-auto border border-white/10 border-b-0 relative">
              <FeatureVideo
                src={activeQuery.videoSrc}
                alt={`Agentic AI Search: ${activeQuery.question}`}
                fallbackSrc={activeQuery.fallbackSrc}
                fixedAspectRatio={true}
              />

              {/* Mobile Navigation Dots - Only visible on mobile */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
                <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                  {searchQueries.map((query, index) => (
                    <button
                      key={query.id}
                      onClick={() => setActiveQuery(query)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeQuery.id === query.id ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Switch to query: ${query.question}`}
                    />
                  ))}
                </div>
              </div>

              {/* Gradient Overlay for Text Readability - HIDDEN on mobile and tablet */}
              <div
                className="absolute inset-0 hidden lg:block pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 40%, transparent 70%)",
                }}
              ></div>

              {/* Overlay Content on top of the video - HIDDEN on mobile and tablet */}
              <div
                className="absolute inset-0 hidden lg:flex flex-col justify-end p-6 lg:p-8"
                onMouseEnter={handleSectionEnter}
                onMouseLeave={handleSectionLeave}
              >
                {/* Bottom Section: Content Left, Query Buttons Right */}
                <div className="flex gap-4 lg:gap-8 items-end justify-between">
                  {/* Left: Feature Info and Install Button - KEEPING ORIGINAL DESIGN */}
                  <div className="flex-1 max-w-xs lg:max-w-md">
                    <h3
                      className="text-white text-xl lg:text-2xl font-semibold mb-3"
                      style={{
                        fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      AI Search
                    </h3>
                    <p
                      className="text-white/95 mb-6 text-base lg:text-lg"
                      style={{
                        fontFamily: "GeistMono, monospace",
                        lineHeight: "1.4",
                        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                      }}
                    >
                      "{activeQuery.question}"
                    </p>
                    {onOpenInstall && (
                      <Button
                        onClick={onOpenInstall}
                        className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg shadow-lg"
                        style={{
                          fontFamily: "GeistMono, monospace",
                          letterSpacing: "0.56px",
                          height: "48px",
                        }}
                      >
                        <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
                        INSTALL NOW
                      </Button>
                    )}
                  </div>

                  {/* Right: Enhanced Query Buttons - FIXED WIDTH CONTAINER */}
                  <div className="flex flex-col gap-2 max-w-xs">
                    {/* Fixed width container for all buttons to prevent layout shifts */}
                    <div className="flex flex-col gap-2 w-[240px]">
                      {searchQueries.map((query) => (
                        <button
                          key={query.id}
                          onClick={() => handleQueryClick(query)}
                          onMouseEnter={() => handleQueryHover(query)}
                          className={`group relative text-left p-3 rounded-xl border-2 transition-colors duration-200 ${
                            activeQuery.id === query.id
                              ? "bg-white/15 border-white/60 text-white shadow-lg"
                              : "bg-black/30 border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40"
                          }`}
                          style={{
                            backdropFilter: "blur(8px)",
                            height: "auto",
                            minHeight: "64px",
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <div className="flex-1 min-w-0">
                              {/* Category Badge */}
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getCategoryColor(
                                    query.category,
                                  )}`}
                                  style={{
                                    fontFamily: "GeistMono, monospace",
                                  }}
                                >
                                  {query.category}
                                </span>
                                {activeQuery.id === query.id && (
                                  <Play className="w-3 h-3 text-white/80" fill="currentColor" />
                                )}
                              </div>
                              {/* Question Text */}
                              <p
                                className="text-xs leading-relaxed"
                                style={{
                                  fontFamily: "GeistMono, monospace",
                                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                                }}
                              >
                                "{query.question}"
                              </p>
                            </div>
                          </div>

                          {/* Hover Effect Border - SIMPLIFIED */}
                          {hoveredQuery === query.id && activeQuery.id !== query.id && (
                            <div
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(255, 92, 40, 0.1), rgba(255, 92, 157, 0.1))",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                              }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
