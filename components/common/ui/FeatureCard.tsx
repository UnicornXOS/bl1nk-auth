import type { JSX } from "react";

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({
  title,
  icon,
  description,
  delay = 0,
}: FeatureCardProps): JSX.Element {
  return (
    <div className="p-6 glassmorphism rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
      <div className="text-4xl mb-4 filter drop-shadow-lg">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}
