import React from 'react';

/**
 * NeumorphicInput — soft inset neumorphic text field.
 * Requires styles.css (or effects.css) to be loaded for the `.neumorphic-input`
 * class that provides the shadow recipe and dark-mode adaptation.
 */
export function NeumorphicInput({ className = '', style, ...props }) {
  return (
    <input
      data-slot="neumorphic-input"
      className={`neumorphic-input${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  );
}
