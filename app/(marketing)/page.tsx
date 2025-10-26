import { Hero } from '@/components/marketing/Hero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { Testimonials } from '@/components/marketing/Testimonials';
import { PricingPlans } from '@/components/marketing/PricingPlans';
import type { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <Testimonials />
      <PricingPlans />
    </>
  );
}
