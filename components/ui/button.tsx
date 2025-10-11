'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
  size?: 'icon' | 'default';
};

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(' ');
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'default', className, ...props },
  ref
) {
  const variantClass = variant === 'outline' ? styles.outline : styles.primary;
  const sizeClass = size === 'icon' ? styles.icon : styles.default;
  const resolvedClassName = joinClassNames(styles.button, variantClass, sizeClass, className);
  return <button ref={ref} className={resolvedClassName} {...props} />;
});

export default Button;
