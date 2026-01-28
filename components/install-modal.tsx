"use client"

import { useState, useEffect, useRef } from "react"
import { X, Copy, Check, Download, Search, Terminal } from "lucide-react"

interface InstallModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const [activeTab, setActiveTab] = useState<string>("cursor")
  const [copied, setCopied] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal with escape key or outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleOutsideClick)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const installOptions = [
    {
      id: "cursor",
      name: "Cursor",
      command: "ext install iganbold.yoyo-ai-versioning",
      deeplink: "cursor:extension/iganbold.yoyo-ai-versioning",
    },
    {
      id: "windsurf",
      name: "Windsurf",
      command: "ext install iganbold.yoyo-ai-versioning",
      deeplink: "windsurf:extension/iganbold.yoyo-ai-versioning",
    },
    {
      id: "vscode",
      name: "VS Code",
      command: "ext install iganbold.yoyo-ai-versioning",
      deeplink: "vscode:extension/iganbold.yoyo-ai-versioning",
    },
    {
      id: "claude-code",
      name: "Claude Code",
      command: "ext install iganbold.yoyo-ai-versioning",
      deeplink: "",
      isTerminalBased: true,
    },
    {
      id: "codex-cli",
      name: "Codex CLI",
      command: "ext install iganbold.yoyo-ai-versioning",
      deeplink: "",
      isTerminalBased: true,
    },
    {
      id: "other",
      name: "Other",
      command: "ext install iganbold.yoyo-ai-versioning",
      deeplink: "",
    },
  ]

  const activeOption = installOptions.find((option) => option.id === activeTab) || installOptions[0]

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-black border border-white/10 rounded-[16px] shadow-2xl my-4 md:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 bg-black rounded-t-[16px] border-b border-white/10">
          <h2
            className="text-xl md:text-2xl font-semibold text-white"
            style={{
              fontFamily: 'var(--font-geist-sans, "GeistSans", sans-serif)',
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
            }}
          >
            Install YOYO
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Tabs - scrollable on mobile */}
          <div className="flex overflow-x-auto pb-2 mb-4 border-b border-white/10 hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {installOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors whitespace-nowrap ${
                    activeTab === option.id ? "bg-white text-black" : "bg-transparent text-white/80 hover:bg-white/10"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Claude Code Special Section */}
            {activeTab === "claude-code" && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    Claude Code + YOYO Setup
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Run Claude Code in your terminal inside editors like Cursor, Windsurf, or VS Code. Pair it with YOYO
                    in the sidebar for the ideal vibe coding workflow.
                  </p>

                  {/* Demo Video */}
                  <div className="bg-black rounded-lg overflow-hidden mb-4">
                    <video className="w-full h-auto" controls preload="metadata" style={{ maxHeight: "300px" }}>
                      <source
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cllaude%20code%20YOYO%20setup-cepgrSbpCLJNjzr2AR2oSoPaWH73CH.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="space-y-3">
                    <div className="text-white/70 text-sm">
                      <strong>Step 1:</strong> Install YOYO extension in your editor (Cursor, Windsurf, or VS Code)
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Step 2:</strong> Run Claude Code from the built-in terminal inside your editor
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Step 3:</strong> Use YOYO sidebar to save/restore versions instantly
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Codex CLI Special Section */}
            {activeTab === "codex-cli" && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    Codex CLI + YOYO Setup
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Run OpenAI Codex CLI in your terminal inside editors like Cursor, Windsurf, or VS Code. Pair it with
                    YOYO in the sidebar for seamless AI-assisted development with version control.
                  </p>

                  {/* Demo Video */}
                  <div className="bg-black rounded-lg overflow-hidden mb-4">
                    <video className="w-full h-auto" controls preload="metadata" style={{ maxHeight: "300px" }}>
                      <source
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/codex-yoyo-kqbKQsIS0uDFYJHrGUhQxEb15MDfHX.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="space-y-3">
                    <div className="text-white/70 text-sm">
                      <strong>Step 1:</strong> Install YOYO extension in your editor (Cursor, Windsurf, or VS Code)
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Step 2:</strong> Run OpenAI Codex CLI from the built-in terminal inside your editor
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Step 3:</strong> Use YOYO sidebar to save/restore versions instantly
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular install sections for other options */}
            {activeTab !== "claude-code" && activeTab !== "codex-cli" && (
              <>
                {/* Direct Install Button - only show for options with deeplinks */}
                {activeOption.deeplink && (
                  <div className="space-y-2">
                    <a
                      href={activeOption.deeplink}
                      className="block w-full bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-4 rounded-lg text-center transition-colors"
                      style={{
                        fontFamily:
                          'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                        letterSpacing: "0.56px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
                      INSTALL IN {activeOption.name.toUpperCase()}
                    </a>
                    <p className="text-white/50 text-xs text-center">
                      Click the button above to open {activeOption.name} and install YOYO directly
                    </p>
                  </div>
                )}

                {/* Search in Extensions Option */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70 font-mono text-sm">
                    <Search size={16} />
                    {activeTab === "other" ? "Search in Extensions:" : `Search in ${activeOption.name} Extensions:`}
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white">
                    {activeTab === "other" ? (
                      <>
                        1. Open your IDE
                        <br />
                        2. Go to Extensions view (usually Ctrl+Shift+X / Cmd+Shift+X)
                        <br />
                        3. Search for <span className="bg-white/10 px-2 py-0.5 rounded">YOYO</span>
                        <br />
                        4. Click Install
                      </>
                    ) : (
                      <>
                        1. Open {activeOption.name}
                        <br />
                        2. Go to Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
                        <br />
                        3. Search for <span className="bg-white/10 px-2 py-0.5 rounded">YOYO</span>
                        <br />
                        4. Click Install
                      </>
                    )}
                  </div>
                </div>

                {/* Command Palette Option */}
                {activeOption.command && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70 font-mono text-sm">
                      <Terminal size={16} />
                      {activeTab === "other"
                        ? "Run in command palette:"
                        : `Run in ${activeOption.name} command palette:`}
                    </div>
                    <div className="relative">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white overflow-x-auto">
                        {activeOption.command}
                      </div>
                      <button
                        onClick={() => copyToClipboard(activeOption.command, `${activeOption.id}-command`)}
                        className="absolute right-2 top-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Copy command"
                      >
                        {copied === `${activeOption.id}-command` ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    {activeTab === "other" && (
                      <p className="text-white/50 text-xs">
                        Open the command palette with Ctrl+Shift+P / Cmd+Shift+P, then paste and run the command above
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "other" && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
                    <p className="text-white/70 text-sm mb-2">
                      YOYO works with most VS Code-compatible editors and IDEs, including:
                    </p>
                    <ul className="text-white/60 text-sm list-disc pl-5 space-y-1">
                      <li>VS Codium</li>
                      <li>GitPod</li>
                      <li>Code-OSS</li>
                      <li>GitHub Codespaces</li>
                      <li>And other VS Code forks</li>
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 mt-6 border-t border-white/10">
              <p className="text-white/50 text-sm">
                {activeTab === "claude-code"
                  ? "After installing YOYO in your editor, you can use Claude Code in the terminal while YOYO handles version control in the sidebar."
                  : activeTab === "codex-cli"
                    ? "After installing YOYO in your editor, you can use OpenAI Codex CLI in the terminal while YOYO handles version control in the sidebar."
                    : "After installation, open your project and click the YOYO icon in the sidebar to start versioning your AI-assisted code."}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile close button at bottom */}
        <div className="md:hidden p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-mono text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
