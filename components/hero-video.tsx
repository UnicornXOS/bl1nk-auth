"use client"

import { useEffect, useRef, useState } from "react"

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      // Silently try alternative source
      if (video.src.includes("/videos/hero-video-v3.mp4")) {
        video.src =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-video-v3-E4dqT6iUgKB1QNwAX45SXQ5xHIZApB.mp4"
        video.load()
      }
    }

    // Intersection Observer for hero video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3, // Hero video needs more visibility
        rootMargin: "0px",
      },
    )

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)
    observer.observe(container)

    // If already loaded
    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      observer.disconnect()
    }
  }, [])

  // Handle play/pause based on intersection
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    if (isInView) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Hero video autoplay failed:", error)
        })
      }
    } else {
      if (!video.paused) {
        video.pause()
      }
    }
  }, [isInView, isLoaded])

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div ref={containerRef} className="w-full bg-black rounded-[16px] overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero-video-v3.mp4"
          className={`w-full h-auto rounded-[16px] transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
        />
      </div>
    </div>
  )
}
