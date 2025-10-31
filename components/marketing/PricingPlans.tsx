'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

/**
 * Plan feature type definition
 */
interface PlanFeature {
  name: string;
  included: boolean;
}

/**
 * Plan type definition
 */
interface Plan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: PlanFeature[];
  highlighted: boolean;
  buttonText: string;
}

/**
 * PricingPlans component
 * Displays pricing plans with toggle between monthly and yearly billing
 */
const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Plans data
  const plans: Plan[] = [
    {
      name: 'ฟรี',
      description: 'สำหรับผู้ใช้งานทั่วไปและโปรเจกต์ขนาดเล็ก',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { name: 'ผู้ใช้งาน 1 คน', included: true },
        { name: 'โปรเจกต์ไม่จำกัด', included: true },
        { name: 'พื้นที่เก็บข้อมูล 5GB', included: true },
        { name: 'การวิเคราะห์พื้นฐาน', included: true },
        { name: 'การสนับสนุนทางอีเมล', included: false },
        { name: 'การบูรณาการขั้นสูง', included: false },
        { name: 'การสำรองข้อมูลอัตโนมัติ', included: false },
      ],
      highlighted: false,
      buttonText: 'เริ่มต้นใช้งานฟรี',
    },
    {
      name: 'มืออาชีพ',
      description: 'สำหรับทีมขนาดเล็กและธุรกิจที่กำลังเติบโต',
      price: {
        monthly: 29,
        yearly: 290,
      },
      features: [
        { name: 'ผู้ใช้งาน 5 คน', included: true },
        { name: 'โปรเจกต์ไม่จำกัด', included: true },
        { name: 'พื้นที่เก็บข้อมูล 50GB', included: true },
        { name: 'การวิเคราะห์ขั้นสูง', included: true },
        { name: 'การสนับสนุนทางอีเมลและแชท', included: true },
        { name: 'การบูรณาการขั้นสูง', included: true },
        { name: 'การสำรองข้อมูลอัตโนมัติ', included: false },
      ],
      highlighted: true,
      buttonText: 'เริ่มต้นใช้งาน',
    },
    {
      name: 'องค์กร',
      description: 'สำหรับองค์กรขนาดใหญ่ที่ต้องการความปลอดภัยสูงสุด',
      price: {
        monthly: 99,
        yearly: 990,
      },
      features: [
        { name: 'ผู้ใช้งานไม่จำกัด', included: true },
        { name: 'โปรเจกต์ไม่จำกัด', included: true },
        { name: 'พื้นที่เก็บข้อมูล 500GB', included: true },
        { name: 'การวิเคราะห์ขั้นสูงพร้อมรายงาน', included: true },
        { name: 'การสนับสนุนตลอด 24/7', included: true },
        { name: 'การบูรณาการขั้นสูงและ API', included: true },
        { name: 'การสำรองข้อมูลอัตโนมัติ', included: true },
      ],
      highlighted: false,
      buttonText: 'ติดต่อฝ่ายขาย',
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
              แผนราคาที่เหมาะกับทุกความต้องการ
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              เลือกแผนที่เหมาะสมกับธุรกิจของคุณ ยกเลิกได้ทุกเมื่อ
            </p>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              รายเดือน
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              รายปี{' '}
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                ประหยัด 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 ${
                plan.highlighted
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-2 ring-blue-500 dark:ring-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              } border rounded-xl shadow-sm relative`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  แนะนำ
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">฿</span>
                  <span className="text-5xl font-bold text-gray-900 dark:text-gray-50">
                    {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">
                    /{billingCycle === 'monthly' ? 'เดือน' : 'ปี'}
                  </span>
                </div>
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    ประหยัด ฿{plan.price.monthly * 12 - plan.price.yearly} เมื่อชำระรายปี
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600 mr-2 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-auto w-full py-3 px-4 rounded-lg font-medium ${
                  plan.highlighted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-50'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  plan.highlighted ? 'focus:ring-blue-500' : 'focus:ring-gray-500'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ section */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            มีคำถาม?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              ติดต่อทีมงานของเรา
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;