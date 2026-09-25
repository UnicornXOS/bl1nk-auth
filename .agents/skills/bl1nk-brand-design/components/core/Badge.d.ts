import * as React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant. @default "default" */
  variant?: BadgeVariant;
}

export declare function Badge(props: BadgeProps): React.ReactElement;
