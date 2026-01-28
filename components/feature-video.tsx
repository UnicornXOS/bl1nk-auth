"use client"

import { useEffect, useRef, useState } from "react"

interface FeatureVideoProps {
  src: string
  alt: string
  fallbackSrc?: string
  fixedAspectRatio?: boolean
}

export default function FeatureVideo({ src, alt, fallbackSrc, fixedAspectRatio = false }: FeatureVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      // Silently try fallback if available
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc)
        setIsLoaded(false)
      }
    }

    // Intersection Observer to detect when video enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of video is visible
        rootMargin: "50px 0px", // Start playing a bit before entering viewport
      },
    )

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)
    observer.observe(container)

    // Reset when src changes
    video.load()

    // If already loaded
    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      observer.disconnect()
    }
  }, [currentSrc, fallbackSrc])

  // Handle play/pause based on intersection and load state
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    if (isInView) {
      // Try to play the video
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video autoplay failed:", error)
          // Autoplay failed, but that's okay
        })
      }
    } else {
      // Pause when out of view
      if (!video.paused) {
        video.pause()
      }
    }
  }, [isInView, isLoaded])

  // Update source when prop changes
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src)
      setIsLoaded(false)
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      className={`w-full bg-black rounded-t-lg overflow-hidden ${fixedAspectRatio ? "" : ""}`}
      style={fixedAspectRatio ? { aspectRatio: "1728/1080" } : {}}
    >
      <video
        ref={videoRef}
        src={currentSrc}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        loop
        muted
        playsInline
        controls={false}
        preload="auto"
        aria-label={alt}
      />
    </div>
  )
}
