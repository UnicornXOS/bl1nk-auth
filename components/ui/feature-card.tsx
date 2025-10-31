import type { JSX } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ title, icon, description, delay = 0 }: FeatureCardProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-blue-500/50 transition-colors"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}