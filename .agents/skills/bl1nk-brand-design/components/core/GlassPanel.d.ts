import * as React from 'react';

export type GlassPanelTone = 'dark' | 'light';

/**
 * @startingPoint section="Components" subtitle="Liquid glass container — dark or light tone" viewport="700x240"
 */
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual tone.
   * - `dark`  — smoked translucent slab (default). Brand emerald text. Best over colourful or dark backgrounds.
   * - `light` — bright frosted white slab. Best over colourful backgrounds or imagery.
   * @default "dark"
   */
  tone?: GlassPanelTone;
}

export declare function GlassPanel(props: GlassPanelProps): React.ReactElement;
