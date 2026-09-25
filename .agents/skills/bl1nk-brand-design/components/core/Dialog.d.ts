import * as React from 'react';

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Called when the dialog requests to open or close. */
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /** Merge onClick onto the child element instead of wrapping it. */
  asChild?: boolean;
}
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogHeaderProps  extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogTitleProps   extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogFooterProps  extends React.HTMLAttributes<HTMLDivElement> {}

export declare function Dialog(props: DialogProps): React.ReactElement;
export declare function DialogTrigger(props: DialogTriggerProps): React.ReactElement;
export declare function DialogPortal(props: { children: React.ReactNode }): React.ReactPortal | null;
export declare function DialogOverlay(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function DialogContent(props: DialogContentProps): React.ReactElement | null;
export declare function DialogHeader(props: DialogHeaderProps): React.ReactElement;
export declare function DialogTitle(props: DialogTitleProps): React.ReactElement;
export declare function DialogDescription(props: DialogDescriptionProps): React.ReactElement;
export declare function DialogFooter(props: DialogFooterProps): React.ReactElement;
