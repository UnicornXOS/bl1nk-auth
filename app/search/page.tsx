import { designTokens } from "@/lib/theme/tokens";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration - in a real app, this would come from an API
  const mockData = [
    {
      id: 1,
      title: "Documentation Guide",
      type: "documentation",
      path: "/docs",
      description: "Complete guide to using BL1NK AUTH",
    },
    {
      id: 2,
      title: "API Reference",
      type: "documentation",
      path: "/docs/api",
      description: "Complete API reference for developers",
    },
    {
      id: 3,
      title: "Authentication Settings",
      type: "settings",
      path: "/profile",
      description: "Manage your authentication preferences",
    },
    {
      id: 4,
      title: "Admin Dashboard",
      type: "page",
      path: "/admin",
      description: "Administrative control panel",
    },
    {
      id: 5,
      title: "Team Management",
      type: "page",
      path: "/team",
      description: "Manage team members and permissions",
    },
    {
      id: 6,
      title: "Pricing Plans",
      type: "page",
      path: "/pricing",
      description: "View available pricing plans",
    },
    {
      id: 7,
      title: "Login Page",
      type: "page",
      path: "/auth/login",
      description: "User authentication interface",
    },
  ];

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      // Simulate API delay
      const timeout = setTimeout(() => {
        const searchTerm = query.toLowerCase().trim();
        const filteredResults = mockData.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm),
        );
        setResults(filteredResults);
        setLoading(false);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/" className="text-xl font-bold">
            ← BL1NK AUTH
          </Link>
          <h1 className="text-2xl font-semibold">ผลการค้นหา</h1>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                // In a real app, you'd update the URL here
                // For demo, we'll just keep it as is
              }}
              placeholder="ค้นหาเอกสาร, หน้า, หรือการตั้งค่า..."
              className="flex-1 px-4 py-2 bg-[#0A0A0A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D9FF]"
            />
            <button
              onClick={() => {
                // In a real app, this would trigger a new search
              }}
              className="px-4 py-2 bg-[#00D9FF] text-[#0A0A0A] rounded-lg hover:bg-[#00BED4] transition-colors"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse w-8 h-8 border-4 border-[#00D9FF] border-t-transparent rounded-full"></div>
            <p className="mt-4 text-white/50">กำลังค้นหา...</p>
          </div>
        ) : query.trim() === "" ? (
          <div className="text-center py-12">
            <p className="text-white/50">กรอกคำค้นหาเพื่อเริ่มต้นการค้นหา</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/50">ไม่พบผลลัพธ์สำหรับ "{query}"</p>
            <p className="mt-2 text-white/40 text-sm">ลองใช้คำค้นหาที่แตกต่างกัน หรือตรวจสอบการสะกด</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-white/50 mb-2">
              พบ {results.length} ผลลัพธ์สำหรับ "{query}"
            </p>
            <div className="space-y-3">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.path}
                  className="flex items-center space-x-4 p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#334155] transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00D9FF]/20 rounded-lg flex items-center justify-center">
                    {result.type === "documentation" ? (
                      <span className="text-[#00D9FF]">📄</span>
                    ) : result.type === "settings" ? (
                      <span className="text-[#00D9FF]">⚙️</span>
                    ) : (
                      <span className="text-[#00D9FF]">📱</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{result.title}</h3>
                    <p className="text-white/50 mt-1">{result.description}</p>
                    <span className="text-xs text-white/40">{result.path}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
