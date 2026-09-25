// biome-ignore-all lint/suspicious/noExplicitAny: Ambient module declarations for optional UI packages
declare module "framer-motion" {
  export const motion: any;
  export const AnimatePresence: any;
}
declare module "react-day-picker" {
  export const DayPicker: any;
  export const getDefaultClassNames: any;
  export type DayButton = any;
}
declare module "embla-carousel-react" {
  export type UseEmblaCarouselType = any;
  const useEmblaCarousel: any;
  export default useEmblaCarousel;
}
declare module "recharts" {
  const recharts: any;
  export default recharts;
  export type LegendProps = any;
  export const ResponsiveContainer: any;
  export const Tooltip: any;
}
declare module "cmdk" {
  export const Command: any;
}
declare module "react-hook-form" {
  export type FieldValues = any;
  export type FieldPath<T> = any;
  export type ControllerProps<T1, T2> = any;
  export const Controller: any;
  export const FormProvider: any;
  export const useFormContext: any;
}
declare module "input-otp" {
  export const OTPInput: any;
  export const OTPInputContext: any;
}
declare module "react-resizable-panels" {
  export const PanelGroup: any;
  export const Panel: any;
  export const PanelResizeHandle: any;
}
declare module "sonner" {
  export const Toaster: any;
  export const toast: any;
}
