import * as React from 'react';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled active tab value. */
  value?: string;
  /** Default active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
}
export interface TabsListProps    extends React.HTMLAttributes<HTMLDivElement> {}
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value this trigger activates. */
  value: string;
}
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value this panel belongs to. */
  value: string;
}

export declare function Tabs(props: TabsProps): React.ReactElement;
export declare function TabsList(props: TabsListProps): React.ReactElement;
export declare function TabsTrigger(props: TabsTriggerProps): React.ReactElement;
export declare function TabsContent(props: TabsContentProps): React.ReactElement | null;
