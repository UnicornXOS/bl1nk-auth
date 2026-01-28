"use client"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"
import InstallModal from "@/components/install-modal"

interface NavbarProps {
  isBannerVisible?: boolean
}

export default function Navbar({ isBannerVisible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false)

  // Debounce the scroll handler to prevent flickering
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }
  }, [scrolled])

  useEffect(() => {
    // Initial check on mount
    handleScroll()

    // Add event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Apply styles consistently
  const navStyle = {
    boxShadow: scrolled ? "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 5px 18px 0 rgba(204,204,204,0.1)" : "none",
    border: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
  }

  return (
    <div
      className={`fixed ${isBannerVisible ? "top-[44px] sm:top-12" : "top-0"} left-0 right-0 z-50 flex justify-center px-6 md:px-8 transition-all duration-300`}
    >
      <div className="w-[calc(100%-24px)] max-w-[1400px] mt-2">
        <nav
          className="flex items-center justify-between p-2 h-16 bg-black rounded-[16px] text-white font-geist"
          style={navStyle}
        >
          <div className="flex items-center ml-[15px]">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
              <path d="M2 17L12 22L22 17" stroke="#FFFFFF" strokeWidth="1" />
              <path d="M2 12L12 17L22 12" stroke="#FFFFFF" strokeWidth="1" />
            </svg>
            <span
              className="logo-text"
              style={{
                fontFamily: 'var(--font-geist-sans), "GeistSans Fallback", sans-serif',
                fontSize: "18px",
                lineHeight: "1.1",
                fontWeight: "600",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                width: "auto",
                height: "auto",
              }}
            >
              YOYO
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://tally.so/r/n0l7BB" target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-transparent hover:bg-white/10 border border-white/30 rounded-lg"
                style={{
                  fontFamily:
                    'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  letterSpacing: "0.32px",
                  color: "#FFFFFF",
                  height: "48px",
                }}
              >
                FEEDBACK
              </Button>
            </a>
            <Button
              className="bg-white text-black hover:bg-gray-200 px-6 h-12 rounded-lg"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",
                letterSpacing: "0.56px",
                color: "#000000",
                height: "48px",
                borderRadius: "8px",
              }}
              onClick={() => setIsInstallModalOpen(true)}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              INSTALL
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center mr-2 p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-[76px] right-6 w-[calc(100%-48px)] max-w-[400px] bg-black border border-[#1a1a1a] rounded-[16px] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-20px] opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-4 flex flex-col gap-4">
            <a
              href="https://tally.so/r/n0l7BB"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button
                className="bg-transparent hover:bg-white/10 border border-white/30 rounded-lg w-full justify-start"
                style={{
                  fontFamily:
                    'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  letterSpacing: "0.32px",
                  color: "#FFFFFF",
                  height: "48px",
                }}
              >
                FEEDBACK
              </Button>
            </a>
            <Button
              className="bg-white text-black hover:bg-gray-200 rounded-lg w-full justify-start"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",
                letterSpacing: "0.56px",
                color: "#000000",
                height: "48px",
                borderRadius: "8px",
              }}
              onClick={() => {
                setMobileMenuOpen(false)
                setIsInstallModalOpen(true)
              }}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              INSTALL
            </Button>
          </div>
        </div>
      </div>

      {/* Install Modal */}
      <InstallModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />
    </div>
  )
}
