'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface BiometricAuthProps {
  onSuccess: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const BiometricAuth = ({
  onSuccess,
  onError,
  className = ''
}: BiometricAuthProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');

  const handleBiometricAuth = async () => {
    if (!window.PublicKeyCredential) {
      onError?.('WebAuthn is not supported on this device');
      return;
    }

    setIsAuthenticating(true);
    setStatus('authenticating');

    try {
      // Simulate biometric authentication
      // In real implementation, this would use WebAuthn API
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus('success');
      onSuccess();
    } catch (error) {
      setStatus('error');
      onError?.('Authentication failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'authenticating':
        return '🔄';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '👆';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'authenticating':
        return 'กำลังตรวจสอบ...';
      case 'success':
        return 'ยืนยันตัวตนสำเร็จ';
      case 'error':
        return 'การยืนยันตัวตนล้มเหลว';
      default:
        return 'แตะเพื่อยืนยันตัวตน';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`biometric-auth ${className}`}
    >
      <motion.div
        className="biometric-icon"
        animate={status === 'authenticating' ? {
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        } : {}}
        transition={{
          duration: 2,
          repeat: status === 'authenticating' ? Infinity : 0,
          ease: "easeInOut"
        }}
        onClick={handleBiometricAuth}
        style={{ cursor: isAuthenticating ? 'not-allowed' : 'pointer' }}
      >
        <span className="text-2xl" role="img" aria-label="biometric authentication">
          {getStatusIcon()}
        </span>
      </motion.div>

      <p className="text-center text-sm text-muted-foreground">
        {getStatusText()}
      </p>

      <IOS26Button
        onClick={handleBiometricAuth}
        disabled={isAuthenticating}
        className="w-full"
      >
        {isAuthenticating ? 'กำลังตรวจสอบ...' : 'ใช้การยืนยันตัวตนด้วยไบโอเมตริก'}
      </IOS26Button>
    </motion.div>
  );
};

// Import button component for internal use
import IOS26Button from './ios26-button';

export default BiometricAuth;