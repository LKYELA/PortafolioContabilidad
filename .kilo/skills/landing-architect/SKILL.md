---
name: landing-architect
description: Enforces component-based architecture and modular organization for landing pages. Use when building or refactoring landing pages to ensure scalability, maintainability, and separation of concerns.
version: 1.0.0
author: User
triggers: architecture, component, module, reusable, structure, organize landing page, refactor landing page, scalable
---
<environment_details>
Current time: 2026-05-24T11:36:02-05:00
Working directory: /home/josefdc91/PortafolioContabilidad
Workspace root folder: /home/josefdc91/PortafolioContabilidad
Open tabs:
  index.html
</environment_details>

# Landing Architect Skill

This skill teaches the agent to apply clean software architecture principles to landing pages, focusing on modular components, separation of concerns, reusability, and maintainability.

## Core Principles

1. **Component-Based Architecture**: Break down landing pages into reusable, independent components
2. **Separation of Concerns**: Separate structure (HTML), presentation (CSS), and behavior (JavaScript)
3. **Reusability**: Design components that can be reused across different sections or pages
4. **Maintainability**: Organize code in a way that's easy to understand and modify
5. **Scalability**: Structure the codebase to accommodate growth and new features

## Application Guidelines

### When Building New Landing Pages

1. **Identify Components**: Analyze the landing page design and identify distinct, reusable components (header, hero, features, testimonials, CTA, footer, etc.)

2. **Create Component Structure**:
   - Each component should have its own HTML template
   - Each component should have scoped or modular CSS
   - Each component should encapsulate its own JavaScript behavior when needed

3. **Implement Component Pattern**:
   ```html
   <!-- Example component structure -->
   <div class="component component-feature">
       <div class="component-header">
           <h2 class="component-title">Feature Title</h2>
           <p class="component-description">Feature description</p>
       </div>
       <div class="component-body">
           <!-- Component content -->
       </div>
   </div>
   ```

4. **CSS Organization**:
   - Use BEM (Block Element Modifier) or similar naming convention
   - Scope styles to components to prevent conflicts
   - Create a base stylesheet for shared utilities and variables
   - Consider CSS modules or styled components if using a framework

5. **JavaScript Organization**:
   - Encapsulate component behavior in modules or classes
   - Use event delegation for efficient event handling
   - Keep DOM manipulation within component boundaries
   - Separate concerns: data handling vs. UI updates

### When Refactoring Existing Landing Pages

1. **Analyze Current Structure**: Identify tightly coupled code, duplicated styles, and monolithic sections

2. **Extract Components**: Break down large sections into smaller, reusable components

3. **Isolate Styles**: Move inline styles to CSS files and scope them to components

4. **Modularize JavaScript**: Convert scattered scripts into organized modules

5. **Create Component Library**: Document extracted components for potential reuse

## File Organization Recommendations

```
/assets
  /css
    base.css           # Shared styles, variables, resets
    components/
      header.css       # Header component styles
      hero.css         # Hero component styles
      feature.css      # Feature component styles
    layout.css         # Grid/layout systems
    utilities.css      # Helper classes
  /js
    main.js            # Application entry point
    components/
      Header.js        # Header component logic
      Hero.js          # Hero component logic
      Feature.js       # Feature component logic
    utils/
      dom.js           # DOM utility functions
      events.js        # Event handling utilities
    vendors/           # Third-party libraries
/components
  header.html          # Header component template
  hero.html            # Hero component template
  feature.html         # Feature component template
index.html             # Main landing page
```

## Best Practices

### HTML
- Use semantic HTML elements (header, section, article, nav, etc.)
- Create reusable HTML templates for components
- Use meaningful class names that describe purpose, not appearance
- Avoid inline styles except for dynamic values

### CSS
- Follow a consistent naming methodology (BEM, SMACSS, etc.)
- Use CSS custom properties (variables) for themes and spacing
- Keep selectors simple and avoid deep nesting
- Use !important sparingly and only when necessary
- Implement a responsive design approach (mobile-first recommended)

### JavaScript
- Use modern ES6+ features (modules, arrow functions, destructuring)
- Encapsulate component functionality
- Prefer event delegation over individual event listeners
- Cache DOM references when elements are accessed repeatedly
- Separate state management from DOM manipulation
- Use requestAnimationFrame for animations when possible

### Performance Considerations
- Lazy load below-the-fold content
- Minimize DOM reflows and repaints
- Optimize images and use appropriate formats
- Consider critical CSS for above-the-fold content
- Bundle and minify assets for production

## Implementation Workflow

1. **Planning Phase**
   - Sketch the landing page layout
   - Identify potential components
   - Determine component hierarchy

2. **Component Development**
   - Create HTML template for each component
   - Stylescope CSS for each component
   - Implement JavaScript behavior for interactive components
   - Test components in isolation

3. **Integration Phase**
   - Assemble components in the main landing page
   - Implement layout and grid systems
   - Add global styles and utilities
   - Implement page-level JavaScript (routing, analytics, etc.)

4. **Optimization Phase**
   - Audit performance
   - Optimize assets
   - Refactor for better reuse
   - Ensure accessibility compliance

## Troubleshooting Common Issues

### Style Conflicts
- Increase specificity of component selectors
- Use CSS modules or scoped styles if available
- Check for global styles overriding component styles

### JavaScript Errors
- Verify DOM elements exist before manipulating them
- Check event listener attachment timing
- Ensure proper scope in callbacks and event handlers

### Responsiveness Problems
- Review media query breakpoints
- Check for fixed widths that should be flexible
- Validate viewport meta tag is present

## Example Implementation

Here's a simple example of applying these principles to a feature component:

```html
<!-- feature.html (component template) -->
<div class="feature component">
    <div class="feature__header">
        <h2 class="feature__title">{{title}}</h2>
        <p class="feature__description">{{description}}</p>
    </div>
    <div class="feature__body">
        <!-- Feature-specific content -->
        <div class="feature__content">
            {{content}}
        </div>
    </div>
</div>
```

```css
/* feature.css */
.feature {
    padding: var(--spacing-lg);
    background-color: var(--color-bg-light);
    border-radius: var(--radius-md);
}

.feature__header {
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.feature__title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-sm);
    color: var(--color-primary);
}

.feature__description {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

.feature__body {
    /* Additional styles for body content */
}
```

```javascript
// feature.js (component logic)
class FeatureComponent {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        // Initialize component behavior
        this.bindEvents();
    }
    
    bindEvents() {
        // Attach event listeners
        // Example: this.element.querySelector('.button').addEventListener('click', () => {...})
    }
    
    update(data) {
        // Update component with new data
        // Example: this.element.querySelector('.title').textContent = data.title
    }
    
    destroy() {
        // Cleanup event listeners and references
    }
}

// Usage when component is needed
document.addEventListener('DOMContentLoaded', () => {
    const featureElements = document.querySelectorAll('.feature');
    featureElements.forEach(el => new FeatureComponent(el));
});
```

By following this skill's guidelines, you'll create landing pages that are easier to maintain, scale, and collaborate on, while adhering to software architecture best practices.