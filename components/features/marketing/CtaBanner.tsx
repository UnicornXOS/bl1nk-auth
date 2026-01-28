import type { JSX } from "react";
import Link from "next/link";

export default function CtaBanner(): JSX.Element {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          เริ่มต้นใช้งานวันนี้
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          เข้าร่วมกับธุรกิจอื่นๆ
          ที่ใช้แพลตฟอร์มของเราเพื่อเติบโตและประสบความสำเร็จ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
          >
            เริ่มต้นใช้งานฟรี
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </section>
  );
}
