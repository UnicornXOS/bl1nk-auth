'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IOS26CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const IOS26Card = ({
  children,
  className = '',
  hover = true,
  delay = 0
}: IOS26CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.3,
      delay,
      ease: "easeOut"
    }}
    whileHover={hover ? {
      y: -4,
      transition: { duration: 0.2 }
    } : undefined}
    className={`ios26-card glassmorphism ${className}`}
  >
    {children}
  </motion.div>
);

export default IOS26Card;