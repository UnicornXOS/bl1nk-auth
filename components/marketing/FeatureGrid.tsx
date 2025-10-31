'use client';

import { ReactNode } from 'react';

/**
 * Feature item type definition
 */
interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * FeatureGrid component
 * Displays a grid of features with icons, titles, and descriptions
 */
const FeatureGrid = () => {
  // Feature items data
  const features: FeatureItem[] = [
    {
      title: 'การวิเคราะห์ขั้นสูง',
      description: 'รับข้อมูลเชิงลึกที่ครอบคลุมเกี่ยวกับประสิทธิภาพของธุรกิจของคุณด้วยเครื่องมือวิเคราะห์ขั้นสูง',
      icon: (
        <svg
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: 'การชำระเงินที่ปลอดภัย',
      description: 'ประมวลผลธุรกรรมอย่างปลอดภัยด้วยระบบการชำระเงินที่เข้ารหัสและปลอดภัยสูงสุด',
      icon: (
        <svg
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: 'การจัดการลูกค้า',
      description: 'จัดการความสัมพันธ์กับลูกค้าอย่างมีประสิทธิภาพด้วยเครื่องมือ CRM ที่ใช้งานง่าย',
      icon: (
        <svg
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: 'การบูรณาการที่ยืดหยุ่น',
      description: 'เชื่อมต่อกับแอปและบริการอื่นๆ ได้อย่างง่ายดายด้วย API ที่ยืดหยุ่นและการบูรณาการที่ราบรื่น',
      icon: (
        <svg
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      ),
    },
    {
      title: 'การแจ้งเตือนแบบเรียลไทม์',
      description: 'รับการแจ้งเตือนทันทีเกี่ยวกับกิจกรรมที่สำคัญเพื่อให้คุณไม่พลาดสิ่งสำคัญ',
      icon: (
        <svg
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
    },
    {
      title: 'การสำรองข้อมูลอัตโนมัติ',
      description: 'ข้อมูลของคุณจะได้รับการสำรองโดยอัตโนมัติเพื่อให้มั่นใจว่าจะไม่สูญหายแม้ในกรณีที่เกิดเหตุการณ์ไม่คาดคิด',
      icon: (
        <svg
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
            คุณสมบัติที่ทรงพลัง
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            เครื่องมือและบริการที่ออกแบบมาเพื่อช่วยให้ธุรกิจของคุณเติบโตและประสบความสำเร็จ
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;