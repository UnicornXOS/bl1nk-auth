"use client";

import { useState } from "react";

interface BiometricAuthProps {
  onSuccess: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const BiometricAuth = ({ onSuccess, onError, className = "" }: BiometricAuthProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [status, setStatus] = useState<"idle" | "authenticating" | "success" | "error">("idle");

  const handleBiometricAuth = async () => {
    if (!window.PublicKeyCredential) {
      onError?.("WebAuthn is not supported on this device");
      return;
    }

    setIsAuthenticating(true);
    setStatus("authenticating");

    try {
      // Simulate biometric authentication
      // In real implementation, this would use WebAuthn API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus("success");
      onSuccess();
    } catch (error) {
      setStatus("error");
      onError?.("Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "authenticating":
        return "🔄";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "👆";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "authenticating":
        return "กำลังตรวจสอบ...";
      case "success":
        return "ยืนยันตัวตนสำเร็จ";
      case "error":
        return "การยืนยันตัวตนล้มเหลว";
      default:
        return "แตะเพื่อยืนยันตัวตน";
    }
  };

  return (
    <div className={`biometric-auth ${className}`}>
      <div
        className="biometric-icon"
        onClick={handleBiometricAuth}
        style={{ cursor: isAuthenticating ? "not-allowed" : "pointer" }}
      >
        <span className="text-2xl" role="img" aria-label="biometric authentication">
          {getStatusIcon()}
        </span>
      </div>

      <p className="text-center text-sm text-muted-foreground">{getStatusText()}</p>

      <button
        onClick={handleBiometricAuth}
        disabled={isAuthenticating}
        className="w-full ios26-button accessible-button"
      >
        {isAuthenticating ? "กำลังตรวจสอบ..." : "ใช้การยืนยันตัวตนด้วยไบโอเมตริกส์"}
      </button>
    </div>
  );
};

// Import button component for internal use
import IOS26Button from "./ios26-button";

export default BiometricAuth;
