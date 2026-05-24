# Modern Landing Page Design Skill

This skill provides a comprehensive knowledge base and template library for creating modern, responsive, and accessible landing pages.

## Table of Contents
1. [Current Design Trends](#current-design-trends)
2. [Typical Landing Page Sections](#typical-landing-page-sections)
3. [Best Practices](#best-practices)
4. [Responsive Design Principles](#responsive-design-principles)
5. [Recommended Frameworks](#recommended-frameworks)
6. [Accessibility Basics](#accessibility-basics)

---

## Current Design Trends

### Glassmorphism
- Frosted glass effect with background blur
- Transparency with subtle borders
- Works well on both light and dark themes
- Example CSS:
```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Neumorphism
- Soft extruded plastic look
- Subtle shadows for depth
- Best for cards and buttons (use sparingly)
- Example CSS:
```css
.neumorphism {
  background: #e0e5ec;
  border-radius: 12px;
  box-shadow: inset 8px 8px 16px #a3b1c6,
              inset -8px -8px 16px #ffffff;
}
```

### Minimalism
- Clean layouts with ample white space
- Focus on essential elements
- Limited color palette
- Clear typographic hierarchy

### Dark Mode
- Provide dark/light theme toggle
- Ensure adequate contrast in both modes
- Use CSS variables for theme colors

### Gradients
- Subtle linear or radial gradients
- Can be used in hero sections, buttons, or backgrounds
- Example:
```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## Typical Landing Page Sections

### Hero Section
- Main headline and subheadline
- Primary CTA button
- Supporting visual (image, illustration, or animation)
- Should communicate value proposition within 5 seconds

### Features Section
- Icon or illustration for each feature
- Concise benefit-focused descriptions
- Typically 3-4 columns on desktop, stacking on mobile

### Testimonials Section
- Social proof from customers/clients
- Include name, title, and photo if possible
- Can be a carousel or grid layout

### Pricing Section
- Clear tier comparison (usually 3 tiers)
- Highlight most popular/recommended plan
- Include feature checklists and CTA for each tier

### CTA Section
- Strong, action-oriented copy
- Secondary CTA option (e.g., "Learn More")
- Creates urgency or highlights benefit

### Footer
- Navigation links (minimal)
- Contact information
- Social media icons
- Newsletter signup (optional)
- Legal links

---

## Best Practices

### Typography
- Limit to 2 font families (heading and body)
- Use appropriate font weights for hierarchy
- Ensure readable font sizes (min 16px for body)
- Maintain proper line height (1.5-1.7)
- Use responsive typography with clamp() or media queries

### Spacing
- Consistent spacing system (4px or 8px grid)
- Adequate white space around elements
- Use margin/padding consistently
- Consider using CSS custom properties for spacing

### Color Contrast
- Minimum 4.5:1 contrast for normal text (WCAG AA)
- 3:1 for large text
- Use tools to verify contrast ratios
- Consider color blindness in palette selection

### Visual Hierarchy
- Size: larger elements attract more attention
- Color: bright or contrasting colors stand out
- Placement: elements at top/left get more attention (in LTR cultures)
- Whitespace: isolates important elements
- Typography: weight, size, and style create hierarchy

---

## Responsive Design Principles

### Mobile-First Approach
- Start with styles for mobile devices
- Enhance for larger screens with media queries
- Prioritize content and performance on mobile

### Breakpoints
- Common breakpoints: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Use min-width queries for mobile-first

### Layout Systems
- **Flexbox**: ideal for one-dimensional layouts (rows or columns)
- **CSS Grid**: ideal for two-dimensional layouts (rows and columns)
- Combine both for complex layouts

### Fluid Typography
- Use `clamp()` for responsive font sizes:
```css
font-size: clamp(1rem, 2.5vw, 2rem);
```

### Fluid Spacing
- Apply similar principles to padding/margin

---

## Recommended Frameworks

### Tailwind CSS
- Utility-first framework
- Rapid prototyping with consistent design system
- Excellent for custom designs
- Example setup:
```html
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" rel="stylesheet">
```

### Bootstrap 5
- Component-based with extensive documentation
- Good for faster development with pre-built components
- Less flexible for highly custom designs
- Example setup:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

### Vanilla CSS with CSS Variables
- Full control over design
- No build step required
- Easy to maintain with custom properties
- Example:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --background-light: #ffffff;
  --background-dark: #1f2937;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --spacing-unit: 8px;
}
```

---

## Accessibility Basics

### ARIA Labels
- Use `aria-label` for icons or buttons without text
- `aria-labelledby` for complex labels
- `aria-describedb` for additional descriptions

### Focus States
- Ensure visible focus outlines for keyboard navigation
- Never remove focus outlines without providing alternative
- Custom focus styles should be obvious

### Color Contrast
- Verify all text meets WCAG contrast requirements
- Check contrast for icons and graphical elements

### Semantic HTML
- Use appropriate elements (`header`, `nav`, `main`, `section`, `footer`)
- Proper heading hierarchy (h1 → h6)
- Lists for navigation and feature items

### Touch Targets
- Minimum 44x44px for interactive elements
- Adequate spacing between touch targets

### Forms
- Associate labels with inputs using `for` attribute
- Provide clear error messages
- Ensure keyboard navigable

### Motion
- Respect `prefers-reduced-motion` media query
- Provide alternatives to animated content

---

## Using This Skill

1. Read these instructions to understand modern design principles
2. Browse the `templates/` section for reusable code snippets
3. Examine the `examples/` folder for complete landing page implementations
4. Combine templates and customize based on your specific needs
5. Always test responsiveness and accessibility

## Optional: Dark/Light Theme Toggle

Implement using CSS variables and a simple JavaScript toggle:
```css
:root {
  --background: #ffffff;
  --text: #111827;
  --primary: #6366f1;
}

[data-theme="dark"] {
  --background: #1f2937;
  --text: #f9fafb;
  --primary: #8b5cf6;
}
```
```javascript
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
});
```

---

*Last updated: May 2026*