High-end animated CTA button. Spring hover scale, emerald glow shadow, and a specular sheen sweep on hover. No framer-motion dependency — pure CSS + React state.

```jsx
/* Primary CTA */
<GlowButton>Get started</GlowButton>
<GlowButton size="lg">Get started</GlowButton>

/* Over colourful backgrounds */
<GlowButton variant="glass">Explore</GlowButton>

/* Subtle secondary */
<GlowButton variant="outline">Learn more</GlowButton>
<GlowButton variant="outline" disabled>Unavailable</GlowButton>
```

**Variants:** `solid` (emerald fill + glow) · `glass` (liquid glass) · `outline` (emerald border, glows on hover)
**Sizes:** `sm` h-36px · `default` h-44px · `lg` h-52px
**Animation:** Hover → scale(1.025) + sheen sweep + stronger glow · Tap → scale(0.97)
