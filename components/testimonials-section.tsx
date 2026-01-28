"use client"

import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Single Testimonial Card - Now clickable */}
        <a
          href="https://youtu.be/7s9C92Pkcc0?si=hOMms9Zczg5V6r53"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch Rick Rubin discuss Vibe Coding on The Ben & Marc Show"
          className="block relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        >
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 opacity-20">
            <Quote className="h-12 w-12 text-white" />
          </div>

          {/* YouTube Play Indicator */}
          <div className="absolute top-8 right-8 opacity-60 group-hover:opacity-100 transition-opacity">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Rick Rubin Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/images/design-mode/Image%20to%20ASCII%20May%2029%202025.jpg.jpeg"
                  alt="Rick Rubin ASCII art portrait"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Quote and Attribution */}
            <div className="flex-1 text-center lg:text-left">
              <blockquote className="mb-6">
                <p
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  "Vibe Coding is the{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Punk Rock
                  </span>{" "}
                  of Software"
                </p>
              </blockquote>

              {/* Attribution */}
              <footer>
                <cite
                  className="not-italic text-white font-bold text-xl md:text-2xl block mb-2"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                  }}
                >
                  Rick Rubin
                </cite>
                <p
                  className="text-white/80 text-base md:text-lg mb-2"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                  }}
                >
                  Legendary Music Producer
                </p>
                <p
                  className="text-white/60 text-sm"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  }}
                >
                  a16z The Ben & Marc Show
                </p>
              </footer>
            </div>
          </div>

          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-orange-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </a>

        {/* Bottom Text */}
        <div className="text-center mt-12 md:mt-16">
          <p
            className="text-white/60 max-w-3xl mx-auto"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            YOYO empowers the rebellious, creative spirit of coding — where breakthrough innovations are born.
          </p>
        </div>
      </div>
    </section>
  )
}
