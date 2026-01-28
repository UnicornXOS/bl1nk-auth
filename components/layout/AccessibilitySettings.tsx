"use client";

import { useAccessibility } from "./accessibility-provider";
import IOS26Button from "./ios26-button";
import IOS26Card from "./ios26-card";

export function AccessibilitySettings() {
  const {
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reduceMotion,
    setReduceMotion,
    voiceNavigation,
    setVoiceNavigation,
  } = useAccessibility();

  return (
    <IOS26Card className="p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        การตั้งค่าการเข้าถึง
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="high-contrast"
              className="font-medium text-foreground"
            >
              ความคมชัดสูง
            </label>
            <p className="text-sm text-muted-foreground">
              เพิ่มความคมชัดของสีเพื่อการมองเห็นที่ดีขึ้น
            </p>
          </div>
          <button
            id="high-contrast"
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={() => setHighContrast(!highContrast)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              highContrast ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                highContrast ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="large-text" className="font-medium text-foreground">
              ข้อความขนาดใหญ่
            </label>
            <p className="text-sm text-muted-foreground">
              เพิ่มขนาดตัวอักษรสำหรับการอ่านที่ง่ายขึ้น
            </p>
          </div>
          <button
            id="large-text"
            type="button"
            role="switch"
            aria-checked={largeText}
            onClick={() => setLargeText(!largeText)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              largeText ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                largeText ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="reduce-motion"
              className="font-medium text-foreground"
            >
              ลดการเคลื่อนไหว
            </label>
            <p className="text-sm text-muted-foreground">
              ลดหรือปิดใช้งานแอนิเมชันเพื่อความสบายตา
            </p>
          </div>
          <button
            id="reduce-motion"
            type="button"
            role="switch"
            aria-checked={reduceMotion}
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              reduceMotion ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                reduceMotion ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="voice-navigation"
              className="font-medium text-foreground"
            >
              นำทางด้วยเสียง
            </label>
            <p className="text-sm text-muted-foreground">
              ใช้ Ctrl+V เพื่อฟังเนื้อหาขององค์ประกอบที่เลือก
            </p>
          </div>
          <button
            id="voice-navigation"
            type="button"
            role="switch"
            aria-checked={voiceNavigation}
            onClick={() => setVoiceNavigation(!voiceNavigation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              voiceNavigation ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                voiceNavigation ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          การตั้งค่าเหล่านี้จะถูกบันทึกและใช้ในครั้งต่อไปที่คุณเข้าชม
        </p>
      </div>
    </IOS26Card>
  );
}

export default AccessibilitySettings;
