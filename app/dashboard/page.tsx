import { redirect } from "next/navigation";
import DashboardClient, {
  type DashboardOverview,
} from "@/components/features/dashboard/dashboard-client";
import { auth } from "@/lib/auth/middleware";

async function getDashboardOverview(): Promise<DashboardOverview> {
  return {
    metrics: [
      {
        id: "m1",
        labelTh: "อัตราความสำเร็จของ Webhook",
        labelEn: "Webhook Success Rate",
        value: "99.8%",
        trend: { direction: "up", percentage: "+0.4%" },
      },
      {
        id: "m2",
        labelTh: "เวลาตอบสนองเฉลี่ย",
        labelEn: "Avg Latency",
        value: "42ms",
        trend: { direction: "down", percentage: "-12ms" },
      },
      {
        id: "m3",
        labelTh: "คำขอทั้งหมด (24ชม.)",
        labelEn: "Total Requests (24h)",
        value: "1.2M",
        trend: { direction: "up", percentage: "+8.3%" },
      },
    ],
    activities: [
      {
        id: "a1",
        messageEn: "GitHub webhook processed successfully",
        messageTh: "ประมวลผล GitHub webhook สำเร็จ",
        timestamp: "2 mins ago",
        status: "success",
      },
      {
        id: "a2",
        messageEn: "Rate limit threshold reached for IP 192.168.1.10",
        messageTh: "ขีดจำกัดอัตราถูกส่งถึงสำหรับ IP 192.168.1.10",
        timestamp: "15 mins ago",
        status: "warning",
      },
      {
        id: "a3",
        messageEn: "Notion integration key rotated",
        messageTh: "คีย์การเชื่อมต่อ Notion ถูกหมุนเวียน",
        timestamp: "1 hour ago",
        status: "success",
      },
      {
        id: "a4",
        messageEn: "Failed token verification attempt",
        messageTh: "การพยายามยืนยันโทเคนล้มเหลว",
        timestamp: "3 hours ago",
        status: "error",
      },
      {
        id: "a5",
        messageEn: "System health check completed",
        messageTh: "การตรวจสอบสุขภาพระบบเสร็จสมบูรณ์",
        timestamp: "5 hours ago",
        status: "success",
      },
      {
        id: "a6",
        messageEn: "Database connection pool resized",
        messageTh: "ปรับขนาดพูลการเชื่อมต่อฐานข้อมูล",
        timestamp: "8 hours ago",
        status: "success",
      },
    ],
  };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const overview = await getDashboardOverview();

  return <DashboardClient session={session} overview={overview} />;
}
