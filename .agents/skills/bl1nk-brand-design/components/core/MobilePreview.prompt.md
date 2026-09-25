Realistic phone frame for previewing mobile UI. Renders a notch, status bar, scrollable content area, and home indicator.

```jsx
<MobilePreview>
  <YourScreen />
</MobilePreview>

/* Custom size */
<MobilePreview width={375} height={812} time="10:30">
  <YourScreen />
</MobilePreview>

/* No status bar */
<MobilePreview hideStatusBar>
  <FullBleedScreen />
</MobilePreview>
```

**Default size:** 390×844px (iPhone-class)
**Props:** `width` · `height` · `time` (status bar clock) · `hideStatusBar`
