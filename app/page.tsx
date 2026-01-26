import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic tracking-tighter">
            BL1NK AUTH
          </h1>
          <p className="text-gray-400 text-lg">
            Centralized Identity & Access Management
          </p>
        </div>

        <div className="grid gap-4">
          <Link
            href="/auth"
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors text-lg"
          >
            Log In / Sign Up
          </Link>
          <Link
            href="/docs"
            className="w-full py-4 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-colors"
          >
            Developer Documentation
          </Link>
        </div>

        <div className="pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>© 2026 bl1nk Network. Secure SSO Provider.</p>
        </div>
      </div>
    </div>
  );
}
