import * as React from 'react';

export interface CommandProps    extends React.HTMLAttributes<HTMLDivElement> {}
export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface CommandListProps  extends React.HTMLAttributes<HTMLDivElement> {}
export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section heading label. */
  heading?: string;
}
export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called when the item is selected. */
  onSelect?: () => void;
  disabled?: boolean;
}
export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export declare function Command(props: CommandProps): React.ReactElement;
export declare function CommandInput(props: CommandInputProps): React.ReactElement;
export declare function CommandList(props: CommandListProps): React.ReactElement;
export declare function CommandEmpty(props: CommandEmptyProps): React.ReactElement;
export declare function CommandGroup(props: CommandGroupProps): React.ReactElement;
export declare function CommandSeparator(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function CommandItem(props: CommandItemProps): React.ReactElement | null;
export declare function CommandShortcut(props: CommandShortcutProps): React.ReactElement;
