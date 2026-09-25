Translucent liquid-glass container. Looks best over colourful or imagery backgrounds; subtle over flat surfaces.

```jsx
/* Dark smoked slab (default) */
<GlassPanel style={{ padding: 32 }}>
  <h3>Liquid Glass</h3>
  <p>Content inside</p>
</GlassPanel>

/* Bright frosted slab */
<GlassPanel tone="light" style={{ padding: 32 }}>
  <h3>White mode</h3>
</GlassPanel>
```

**Tones:** `dark` — smoked, emerald text · `light` — frosted white, dark text
**CSS dependency:** Requires `styles.css` loaded by the consumer (defines `.glass` / `.glass-light` with `backdrop-filter` + pseudo-elements).
**Fallback:** Solid dark/light bg for browsers without `backdrop-filter`.
