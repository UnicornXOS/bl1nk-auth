import * as React from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether one or multiple items can be open. @default "single" */
  type?: AccordionType;
  /** Allow closing the open item when type="single". @default true */
  collapsible?: boolean;
}
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this item. */
  value: string;
}
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export declare function Accordion(props: AccordionProps): React.ReactElement;
export declare function AccordionItem(props: AccordionItemProps): React.ReactElement;
export declare function AccordionTrigger(props: AccordionTriggerProps): React.ReactElement;
export declare function AccordionContent(props: AccordionContentProps): React.ReactElement;
