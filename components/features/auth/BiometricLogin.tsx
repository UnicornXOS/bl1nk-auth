"use client";

import { useState } from "react";
import BiometricAuth from "./biometric-auth";
import IOS26Button from "./ios26-button";
import IOS26Card from "./ios26-card";

interface BiometricLoginProps {
  onLoginSuccess: (userId: string) => void;
  onLoginError?: (error: string) => void;
  className?: string;
}

export function BiometricLogin({
  onLoginSuccess,
  onLoginError,
  className = "",
}: BiometricLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);

  const handleBiometricSuccess = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to verify biometric authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUserId = "user_" + Date.now();
      onLoginSuccess(mockUserId);
    } catch (error) {
      onLoginError?.("การเข้าสู่ระบบด้วยไบโอเมตริกส์ล้มเหลว");
    } finally {
      setIsLoading(false);
      setShowBiometric(false);
    }
  };

  const handleBiometricError = (error: string) => {
    onLoginError?.(error);
    setShowBiometric(false);
  };

  const handleTraditionalLogin = () => {
    // Fallback to traditional login
    window.location.href = "/login";
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <IOS26Card className="p-8 text-center">
        <div className="mb-6">
          <div className="app-icon mx-auto mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">เข้าสู่ระบบ</h2>
          <p className="text-muted-foreground">เลือกวิธีการเข้าสู่ระบบที่คุณต้องการ</p>
        </div>

        <div className="space-y-4">
          <IOS26Button
            onClick={() => setShowBiometric(true)}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบด้วยไบโอเมตริกส์"}
          </IOS26Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">หรือ</span>
            </div>
          </div>

          <IOS26Button
            variant="outline"
            onClick={handleTraditionalLogin}
            className="w-full"
            size="lg"
          >
            เข้าสู่ระบบด้วยรหัสผ่าน
          </IOS26Button>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          <p>การใช้ไบโอเมตริกส์จะช่วยให้การเข้าสู่ระบบรวดเร็วและปลอดภัยยิ่งขึ้น</p>
        </div>
      </IOS26Card>

      {showBiometric && (
        <BiometricAuth onSuccess={handleBiometricSuccess} onError={handleBiometricError} />
      )}
    </div>
  );
}

export default BiometricLogin;
