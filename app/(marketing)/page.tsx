'use client';

import Link from 'next/link';
import DynamicWidget from '@/components/ui/dynamic-widget';

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen page-transition">
      {/* Header แบบ Liquid Glass */}
      <header className="p-6 backdrop-blur-sm border-b border-blue-500/20">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            bl1nk
          </div>
          <nav className="flex space-x-6">
            <Link href="#" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="#" className="hover:text-blue-300 transition-colors">Features</Link>
            <Link href="#" className="hover:text-blue-300 transition-colors">About</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          blinkOS - LLM IS EVERYTHING
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          แพลตฟอร์ม AI ขั้นสูงที่ผสมผสานเทคโนโลยีล่าสุดกับการออกแบบที่สวยงาม
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/login" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center">
            เริ่มต้นใช้งานฟรี
          </Link>
          <Link href="#demo" className="px-8 py-3 border border-blue-500/50 rounded-lg font-semibold hover:bg-blue-500/10 transition-colors text-center">
            ดูการสาธิต
          </Link>
        </div>

        <div className="ios26-grid max-w-6xl mx-auto">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Builder</h3>
            <p className="text-gray-400">Create AI models with Liquid Glass UI</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">AI Chat</h3>
            <p className="text-gray-400">Chat with advanced AI assistants</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">AI Analytics</h3>
            <p className="text-gray-400">Analyze data with AI-powered insights</p>
          </div>
        </div>
      </section>

      {/* Dynamic Widgets Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            ข้อมูลแบบเรียลไทม์
          </h2>

          <div className="ios26-grid">
            <DynamicWidget title="สภาพอากาศ" updateInterval={300000}>
              <div className="text-center">
                <div className="text-4xl mb-2">☀️</div>
                <div className="text-2xl font-semibold">28°C</div>
                <div className="text-sm text-muted-foreground">กรุงเทพฯ</div>
              </div>
            </DynamicWidget>

            <DynamicWidget title="ข่าวสารล่าสุด" updateInterval={180000}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">AI Technology Update</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New Features Released</span>
                </div>
              </div>
            </DynamicWidget>

            <DynamicWidget title="สถิติการใช้งาน" updateInterval={60000}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">1.2K</div>
                  <div className="text-xs text-muted-foreground">ผู้ใช้</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">98%</div>
                  <div className="text-xs text-muted-foreground">ความพอใจ</div>
                </div>
              </div>
            </DynamicWidget>
          </div>
        </div>
      </section>
    </div>
  );
}
