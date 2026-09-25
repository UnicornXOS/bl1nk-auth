"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { Icon } from "@/components/ui/icon";

interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

const FeatureGrid = () => {
  const features: FeatureItem[] = [
    {
      title: "การวิเคราะห์ขั้นสูง",
      description: "รับข้อมูลเชิงลึกที่ครอบคลุมเกี่ยวกับประสิทธิภาพของธุรกิจของคุณด้วยเครื่องมือวิเคราะห์ขั้นสูง",
      iconName: "insights",
    },
    {
      title: "การชำระเงินที่ปลอดภัย",
      description: "ประมวลผลธุรกรรมอย่างปลอดภัยด้วยระบบการชำระเงินที่เข้ารหัสและปลอดภัยสูงสุด",
      iconName: "verified_user",
    },
    {
      title: "การจัดการลูกค้า",
      description: "จัดการความสัมพันธ์กับลูกค้าอย่างมีประสิทธิภาพด้วยเครื่องมือ CRM ที่ใช้งานง่าย",
      iconName: "groups",
    },
    {
      title: "การบูรณาการที่ยืดหยุ่น",
      description: "เชื่อมต่อกับแอปและบริการอื่นๆ ได้อย่างง่ายดายด้วย API ที่ยืดหยุ่นและการบูรณาการที่ราบรื่น",
      iconName: "extension",
    },
    {
      title: "การแจ้งเตือนแบบเรียลไทม์",
      description: "รับการแจ้งเตือนทันทีเกี่ยวกับกิจกรรมที่สำคัญเพื่อให้คุณไม่พลาดสิ่งสำคัญ",
      iconName: "notifications_active",
    },
    {
      title: "การสำรองข้อมูลอัตโนมัติ",
      description: "ข้อมูลของคุณจะได้รับการสำรองโดยอัตโนมัติเพื่อให้มั่นใจว่าจะไม่สูญหายแม้ในกรณีที่เกิดเหตุการณ์ไม่คาดคิด",
      iconName: "cloud_sync",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white font-heading">
            คุณสมบัติที่ทรงพลัง
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            เครื่องมือและบริการที่ออกแบบมาเพื่อช่วยให้ธุรกิจของคุณเติบโตและประสบความสำเร็จ
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <GlassPanel
              key={feature.title}
              tone="dark"
              className="flex flex-col items-start p-6 border border-white/10 hover:border-[#34d399]/40 transition-all duration-300 group"
            >
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 mb-4 group-hover:scale-110 transition-transform">
                <Icon name={feature.iconName} size={28} className="text-[#34d399]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white font-heading">{feature.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
