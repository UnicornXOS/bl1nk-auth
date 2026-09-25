import * as React from 'react';

export type GlowButtonVariant = 'solid' | 'glass' | 'outline';
export type GlowButtonSize = 'sm' | 'default' | 'lg';

/**
 * @startingPoint section="Components" subtitle="Animated CTA button with emerald glow and sheen sweep" viewport="700x200"
 */
export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style.
   * - `solid`   — emerald fill with animated glow shadow.
   * - `glass`   — liquid-glass slab; best over colourful backgrounds.
   * - `outline` — transparent with emerald border, glows on hover.
   * @default "solid"
   */
  variant?: GlowButtonVariant;
  /** Size preset. @default "default" */
  size?: GlowButtonSize;
}

export declare function GlowButton(props: GlowButtonProps): React.ReactElement;
