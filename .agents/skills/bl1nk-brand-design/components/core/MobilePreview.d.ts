import * as React from 'react';

export interface MobilePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Frame width in px. @default 390 */
  width?: number;
  /** Frame height in px. @default 844 */
  height?: number;
  /** Status-bar time label. @default "9:41" */
  time?: string;
  /** Hide the notch and status bar. @default false */
  hideStatusBar?: boolean;
}

export declare function MobilePreview(props: MobilePreviewProps): React.ReactElement;
