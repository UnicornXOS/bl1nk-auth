'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LiquidLogo from '@/components/ui/liquid-logo';
import FeatureCard from '@/components/ui/feature-card';
import IOS26Button from '@/components/ui/ios26-button';
import DynamicWidget from '@/components/ui/dynamic-widget';

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen page-transition">
      {/* Header แบบ Liquid Glass */}
      <header className="p-6 backdrop-blur-sm border-b border-blue-500/20">
        <div className="flex justify-between items-center">
          <LiquidLogo />
          <nav className="flex space-x-6">
            <Link href="#" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="#" className="hover:text-blue-300 transition-colors">Features</Link>
            <Link href="#" className="hover:text-blue-300 transition-colors">About</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          blinkOS - LLM IS EVERYTHING
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          แพลตฟอร์ม AI ขั้นสูงที่ผสมผสานเทคโนโลยีล่าสุดกับการออกแบบที่สวยงาม
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <IOS26Button size="lg">
            เริ่มต้นใช้งานฟรี
          </IOS26Button>
          <IOS26Button variant="outline" size="lg">
            ดูการสาธิต
          </IOS26Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="ios26-grid max-w-6xl mx-auto"
        >
          <FeatureCard
            title="AI Builder"
            icon="🤖"
            description="Create AI models with Liquid Glass UI"
            delay={0.8}
          />
          <FeatureCard
            title="AI Chat"
            icon="💬"
            description="Chat with advanced AI assistants"
            delay={1.0}
          />
          <FeatureCard
            title="AI Analytics"
            icon="📊"
            description="Analyze data with AI-powered insights"
            delay={1.2}
          />
        </motion.div>
      </section>

      {/* Dynamic Widgets Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            ข้อมูลแบบเรียลไทม์
          </motion.h2>

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
