Soft inset neumorphic text field — the brand's signature dark-UI input style.

```jsx
<NeumorphicInput placeholder="Type something…" />
<NeumorphicInput type="email" defaultValue="hi@bl1nk.io" />
<NeumorphicInput type="password" defaultValue="secret" />
```

**CSS dependency:** Requires `styles.css` loaded by the consumer (defines `.neumorphic-input` with inset shadows).
**Dark mode:** Automatically adapts via `.dark` selector on a parent element.
Focus: Adds emerald ring `rgba(52,211,153,0.55)` around the inset shadow.
