import * as React from 'react';

export type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

/**
 * @startingPoint section="Components" subtitle="Versatile button — 6 variants, 8 sizes" viewport="700x160"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. @default "default" */
  variant?: ButtonVariant;
  /** Size preset. @default "default" */
  size?: ButtonSize;
}

export declare function Button(props: ButtonProps): React.ReactElement;
