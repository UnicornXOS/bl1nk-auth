"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import FeatureVideo from "@/components/feature-video"

interface FeatureData {
  id: string
  title: string
  description: string
  videoSrc: string
  fallbackSrc?: string
  thumbnailSrc: string
}

const features: FeatureData[] = [
  {
    id: "save",
    title: "Save",
    description: "Instantly save your code — and undo bad AI edits anytime.",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yoyo-save-2-DUbUp5aKE9GtNY9Diok2eG6SW2qHCX.mp4",
    fallbackSrc: "/videos/save-review-restore.mp4",
    thumbnailSrc: "/images/save-thumbnail.jpeg",
  },
  {
    id: "preview",
    title: "Preview",
    description: "Switch to any past version in one click.",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yoyo-preview-dnsmAMg2AX6f1thlrNvj1e65T2zUTM.mp4",
    fallbackSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/save-review-restore-g3BK0sricXTSPMzxK4iGrmXBUwPt11.mp4",
    thumbnailSrc: "/images/preview-thumbnail.jpeg",
  },
  {
    id: "restore",
    title: "Restore",
    description: "Go back to a clean version in one click.",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yoyo-restore-rhqD0huLa48Q51Sy9gzIrIdHk2vu2L.mp4",
    fallbackSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/save-review-restore-g3BK0sricXTSPMzxK4iGrmXBUwPt11.mp4",
    thumbnailSrc: "/images/restore-thumbnail.jpeg",
  },
]

interface SaveReviewRestoreSectionProps {
  onOpenInstall?: () => void
}

export default function SaveReviewRestoreSection({ onOpenInstall }: SaveReviewRestoreSectionProps) {
  const [activeFeature, setActiveFeature] = useState(features[0])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [videosLoaded, setVideosLoaded] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Preload all videos when component mounts
  useEffect(() => {
    const loadedState = { ...videosLoaded }

    // Preload all videos but don't autoplay
    features.forEach((feature) => {
      const video = document.createElement("video")
      video.muted = true
      video.preload = "auto"
      video.playsInline = true
      video.loop = true
      // Remove autoplay - videos will be controlled by intersection observer

      video.onloadeddata = () => {
        setVideosLoaded((prev) => ({
          ...prev,
          [feature.id]: true,
        }))
      }

      video.onerror = () => {
        if (feature.fallbackSrc) {
          video.src = feature.fallbackSrc
        }
      }

      video.src = feature.videoSrc
      loadedState[feature.id] = false
    })

    setVideosLoaded(loadedState)
  }, [])

  const handleThumbnailHover = (feature: FeatureData) => {
    setHoveredFeature(feature.id)
    setActiveFeature(feature)
  }

  const handleThumbnailLeave = () => {
    setHoveredFeature(null)
  }

  const handleThumbnailClick = (feature: FeatureData) => {
    setActiveFeature(feature)
  }

  return (
    <div className="my-24">
      {/* Title and Description outside the gradient section */}
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
          Save, Preview, Restore
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
          AI moves fast — one bad prompt can break your flow. YOYO lets you save progress, preview changes, and restore
          instantly.
        </p>
      </div>

      {/* Gradient Section with Video - ORIGINAL DESIGN with overlay only on desktop */}
      <div className="flex justify-center">
        <div className="gradient-container gradient-yellow-red max-w-[1296px] w-full relative">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/35 rounded-[16px]"></div>

          {/* Noise Overlay */}
          <div className="noise-texture"></div>

          {/* Original Video Section */}
          <div className="relative z-10 pt-4 sm:pt-12 md:pt-16 pb-0 px-4 sm:px-6 md:px-12">
            <div className="rounded-t-lg overflow-hidden shadow-2xl max-w-4xl mx-auto border border-white/10 border-b-0 relative">
              <FeatureVideo
                src={activeFeature.videoSrc}
                alt={activeFeature.title}
                fallbackSrc={activeFeature.fallbackSrc}
                fixedAspectRatio={true}
              />

              {/* Mobile Navigation Dots - Only visible on mobile */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
                <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeFeature.id === feature.id ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Switch to ${feature.title}`}
                    />
                  ))}
                </div>
              </div>

              {/* Gradient Overlay for Text Readability - HIDDEN on mobile and tablet */}
              <div
                className="absolute inset-0 hidden lg:block pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 70%)",
                }}
              ></div>

              {/* Overlay Content on top of the video - HIDDEN on mobile and tablet */}
              <div className="absolute inset-0 hidden lg:flex flex-col justify-end p-6 lg:p-8">
                {/* Bottom Section: Content Left, Thumbnails Right */}
                <div className="flex gap-4 lg:gap-8 items-end">
                  {/* Left: Feature Info and Install Button */}
                  <div className="flex-1 max-w-xs lg:max-w-md">
                    <h3
                      className="text-white text-2xl lg:text-3xl font-semibold mb-3"
                      style={{
                        fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {activeFeature.title}
                    </h3>
                    <p
                      className="text-white/95 mb-6 text-base lg:text-lg"
                      style={{
                        fontFamily: "GeistMono, monospace",
                        lineHeight: "1.4",
                        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                      }}
                    >
                      {activeFeature.description}
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

                  {/* Right: Thumbnails - Now using actual YOYO interface images */}
                  <div className="flex gap-3">
                    {features.map((feature, index) => (
                      <div
                        key={feature.id}
                        className="relative group cursor-pointer"
                        onMouseEnter={() => handleThumbnailHover(feature)}
                        onMouseLeave={handleThumbnailLeave}
                        onClick={() => handleThumbnailClick(feature)}
                      >
                        <div
                          className={`w-24 h-15 lg:w-32 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-lg ${
                            activeFeature.id === feature.id
                              ? "border-white shadow-xl scale-105"
                              : "border-white/40 hover:border-white/70 hover:scale-102"
                          }`}
                        >
                          <img
                            src={feature.thumbnailSrc || "/placeholder.svg"}
                            alt={`${feature.title} feature of YOYO`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Thumbnail Label */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span
                            className={`text-sm font-mono transition-colors duration-200 ${
                              activeFeature.id === feature.id ? "text-white" : "text-white/80"
                            }`}
                            style={{
                              fontFamily: "GeistMono, monospace",
                              textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                            }}
                          >
                            {feature.title}
                          </span>
                        </div>
                      </div>
                    ))}
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
