'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero component for the landing page
 * Displays the main headline, subheadline, CTA buttons, and hero image
 */
const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4 lg:space-y-6 lg:w-1/2 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              ยกระดับธุรกิจของคุณด้วยโซลูชันที่ทันสมัย
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mx-auto lg:mx-0">
              แพลตฟอร์มที่ครบวงจรสำหรับการเติบโตและการจัดการธุรกิจของคุณอย่างมีประสิทธิภาพ
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="/signup" 
              className={`inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-500 ${isHovered ? 'scale-105' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              เริ่มต้นใช้งานฟรี
            </Link>
            <Link 
              href="/demo" 
              className="inline-flex h-11 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              ดูการสาธิต
            </Link>
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg
                className="h-4 w-4 mr-1 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>ไม่ต้องใช้บัตรเครดิต</span>
            </div>
            <div className="flex items-center">
              <svg
                className="h-4 w-4 mr-1 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>ยกเลิกได้ทุกเมื่อ</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none aspect-video overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/images/hero-dashboard.webp"
              alt="Dashboard screenshot"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 [background:radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.1),transparent)]"></div>
    </section>
  );
};

export default Hero;