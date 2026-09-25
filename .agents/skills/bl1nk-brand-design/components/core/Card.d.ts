import * as React from 'react';

export type CardSize = 'default' | 'sm';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding/gap density. @default "default" */
  size?: CardSize;
}
export interface CardHeaderProps    extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps     extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardActionProps    extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardContentProps   extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps    extends React.HTMLAttributes<HTMLDivElement> {}

export declare function Card(props: CardProps): React.ReactElement;
export declare function CardHeader(props: CardHeaderProps): React.ReactElement;
export declare function CardTitle(props: CardTitleProps): React.ReactElement;
export declare function CardDescription(props: CardDescriptionProps): React.ReactElement;
export declare function CardAction(props: CardActionProps): React.ReactElement;
export declare function CardContent(props: CardContentProps): React.ReactElement;
export declare function CardFooter(props: CardFooterProps): React.ReactElement;
