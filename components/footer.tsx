import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 text-center">
      <p
        className="text-white/50 text-sm font-mono flex items-center justify-center gap-1.5"
        style={{
          fontFamily:
            'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        }}
      >
        Made with <Heart className="h-3.5 w-3.5 text-red-500 inline-block" fill="currentColor" /> in San Francisco
      </p>
    </footer>
  )
}
