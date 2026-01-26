"use client";

import Image from "next/image";

/**
 * Testimonial item type definition
 */
interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarSrc: string;
}

/**
 * Testimonials component
 * Displays customer testimonials in a responsive grid
 */
const Testimonials = () => {
  // Testimonial items data
  const testimonials: TestimonialItem[] = [
    {
      quote:
        "แพลตฟอร์มนี้ช่วยให้เราเพิ่มประสิทธิภาพการทำงานได้อย่างมาก ทีมของเรามีผลิตภาพเพิ่มขึ้น 40% ตั้งแต่เริ่มใช้งาน",
      author: "สมชาย ใจดี",
      role: "ผู้จัดการฝ่ายปฏิบัติการ",
      company: "บริษัท ไทยเทค จำกัด",
      avatarSrc: "/images/avatars/avatar-1.webp",
    },
    {
      quote:
        "การวิเคราะห์ข้อมูลที่ละเอียดช่วยให้เราตัดสินใจได้ดีขึ้น และเพิ่มยอดขายได้ถึง 30% ในไตรมาสแรกที่ใช้งาน",
      author: "สมหญิง รักดี",
      role: "ผู้อำนวยการฝ่ายการตลาด",
      company: "บริษัท มาร์เก็ตโปร จำกัด",
      avatarSrc: "/images/avatars/avatar-2.webp",
    },
    {
      quote:
        "ระบบความปลอดภัยที่แข็งแกร่งทำให้เรามั่นใจในการจัดการข้อมูลลูกค้า ซึ่งเป็นสิ่งสำคัญที่สุดสำหรับธุรกิจของเรา",
      author: "วิชัย มั่นคง",
      role: "ประธานเจ้าหน้าที่บริหาร",
      company: "บริษัท ซีเคียวเนท จำกัด",
      avatarSrc: "/images/avatars/avatar-3.webp",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              <span className="text-blue-600 dark:text-blue-400">
                ลูกค้าของเรา
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
              เสียงจากลูกค้าที่ไว้วางใจเรา
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              ดูว่าลูกค้าของเราพูดถึงประสบการณ์การใช้งานแพลตฟอร์มของเราอย่างไร
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              <div className="flex items-center mt-4">
                <div className="relative w-10 h-10 mr-4 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatarSrc}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-50">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 grayscale opacity-70">
            <div className="flex items-center justify-center">
              <svg
                className="h-8 md:h-10 lg:h-12 w-auto"
                viewBox="0 0 100 30"
                fill="currentColor"
              >
                <path d="M10 30c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z" />
                <path d="M35 30c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z" />
                <path d="M60 30c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z" />
                <path d="M85 30c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z" />
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <svg
                className="h-8 md:h-10 lg:h-12 w-auto"
                viewBox="0 0 100 30"
                fill="currentColor"
              >
                <path d="M20 5h60v20H20z" />
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <svg
                className="h-8 md:h-10 lg:h-12 w-auto"
                viewBox="0 0 100 30"
                fill="currentColor"
              >
                <path d="M50 5L20 25h60L50 5z" />
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <svg
                className="h-8 md:h-10 lg:h-12 w-auto"
                viewBox="0 0 100 30"
                fill="currentColor"
              >
                <circle cx="50" cy="15" r="10" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
