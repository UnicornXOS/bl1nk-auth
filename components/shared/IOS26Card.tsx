"use client";

import { ReactNode } from "react";

interface IOS26CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const IOS26Card = ({
  children,
  className = "",
  hover = true,
  delay = 0,
}: IOS26CardProps) => (
  <div className={`ios26-card glassmorphism ${className}`}>{children}</div>
);

export default IOS26Card;
