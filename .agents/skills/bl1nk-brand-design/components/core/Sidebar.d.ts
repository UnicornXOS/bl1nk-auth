import * as React from 'react';

export type SidebarSide = 'left' | 'right';
export type SidebarCollapsible = 'icon' | 'offcanvas' | 'none';
export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg';

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default open state for uncontrolled usage. @default true */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called when open state changes. */
  onOpenChange?: (open: boolean) => void;
}
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Which side the sidebar is on. @default "left" */
  side?: SidebarSide;
  /** Collapse behavior. @default "icon" */
  collapsible?: SidebarCollapsible;
}
export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Highlight as the current active item. */
  isActive?: boolean;
  /** Size variant. @default "default" */
  size?: SidebarMenuButtonSize;
  /** Tooltip shown when collapsed. */
  tooltip?: string;
}

export declare function SidebarProvider(props: SidebarProviderProps): React.ReactElement;
export declare function Sidebar(props: SidebarProps): React.ReactElement;
export declare function SidebarTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement;
export declare function SidebarHeader(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function SidebarContent(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function SidebarFooter(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function SidebarGroup(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function SidebarGroupLabel(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function SidebarMenu(props: React.HTMLAttributes<HTMLUListElement>): React.ReactElement;
export declare function SidebarMenuItem(props: React.HTMLAttributes<HTMLLIElement>): React.ReactElement;
export declare function SidebarMenuButton(props: SidebarMenuButtonProps): React.ReactElement;
