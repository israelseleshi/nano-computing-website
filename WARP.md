# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a premium React/TypeScript website for **Nano Computing ICT Solutions**, a technology consultancy company. The site showcases their services, hardware offerings, insights, and company information with modern animations and responsive design.

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.2.0
- **Styling**: Tailwind CSS 3.4.3 with extensive custom configuration
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useContext for theme)

## Development Commands

### Core Development
```bash
# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Package Management
```bash
# Install dependencies
npm install

# Add new dependency
npm install <package-name>

# Add development dependency
npm install -D <package-name>
```

## Architecture & Structure

### High-Level Architecture
This is a **Single Page Application (SPA)** with client-side routing implemented through state management rather than React Router. The architecture follows these patterns:

1. **Component-Based Architecture**: Organized into reusable UI components, pages, and utility components
2. **State-Driven Navigation**: Uses `currentPage` state to conditionally render different page components
3. **Theme System**: Centralized theme management with dark/light mode support
4. **Design System**: Comprehensive Tailwind configuration with custom variables and component classes
5. **Animation-First**: Heavy use of Framer Motion for page transitions and micro-interactions

### Core Application Flow
- `App.tsx` → Main app wrapper with ThemeProvider
- `AppContent` → Contains navigation state and page routing logic
- Page components → Rendered conditionally based on `currentPage` state
- Shared components → Navigation, UI components, animations

### Directory Structure Patterns

```
src/
├── components/           # All React components
│   ├── ui/              # shadcn/ui components (buttons, cards, etc.)
│   ├── pages/           # Page-level components (HomePage, ServicesPage, etc.)
│   ├── layout/          # Layout components (Container, Grid, Stack)
│   ├── animation/       # Animation-related components
│   └── figma/           # Figma-specific components
├── styles/              # Global CSS files
├── constants.ts         # Application constants (navigation, etc.)
├── types.ts            # TypeScript type definitions
└── main.tsx            # Application entry point
```

### Key Architectural Decisions

1. **No React Router**: Uses state-based navigation with `setCurrentPage()` function
2. **Centralized Animation System**: Page transitions handled by AnimatePresence in App.tsx
3. **Theme Provider Pattern**: Theme state managed via React Context
4. **Tailwind-First Styling**: Extensive Tailwind configuration with CSS variables for consistency
5. **Component Composition**: Heavy use of Radix UI primitives for accessibility

## Navigation System

The application uses a custom navigation system instead of React Router:

- **Current Page State**: `currentPage` string determines which component to render
- **Page Navigation**: Use `onPageChange(pageId)` to navigate between pages
- **Available Pages**: 'home', 'services', 'hardware', 'blog', 'about', 'contact', 'product-{id}'
- **Product Pages**: Dynamic product detail pages use 'product-' prefix with product ID

## Styling Guidelines

### Tailwind Configuration
The project uses extensive Tailwind customization with:
- **CSS Variables**: All colors, spacing, fonts use CSS custom properties
- **Design Tokens**: Consistent design system with semantic naming
- **Component Classes**: Pre-defined component classes (.btn, .input, .card)
- **Animation System**: Custom keyframes and animation utilities
- **Responsive Design**: Mobile-first approach with custom breakpoints

### Color System
- **Primary/Secondary**: Brand colors defined via CSS variables
- **Semantic Colors**: Success, warning, info, destructive variants
- **Luxury Extensions**: Gold and platinum color variants
- **Theme-Aware**: All colors work in both light and dark modes

### Component Patterns
- Use shadcn/ui components as base building blocks
- Apply custom variants through className props
- Leverage Framer Motion for animations and transitions
- Follow accessibility patterns with proper ARIA labels

## Component Development

### Adding New Pages
1. Create page component in `src/components/pages/`
2. Add page ID to navigation constants
3. Update routing logic in `App.tsx` renderPage() function
4. Add navigation item to `Navigation.tsx` if needed

### UI Component Guidelines
- Use shadcn/ui components when available
- Follow the established variant patterns (luxury, success, warning, etc.)
- Implement proper TypeScript interfaces
- Add Framer Motion animations for enhanced UX
- Ensure accessibility compliance

### Animation Standards
- Use consistent easing functions: `[0.25, 0.46, 0.45, 0.94]`
- Standard duration: 0.6s for page transitions, 0.2-0.4s for micro-interactions
- Implement staggered animations for lists and grids
- Use AnimatePresence for enter/exit animations

## Development Workflow

### File Organization
- **Page Components**: Major sections of the application (HomePage, AboutPage, etc.)
- **UI Components**: Reusable interface elements following shadcn/ui patterns
- **Layout Components**: Structural components for consistent spacing and alignment
- **Animation Components**: Wrapper components for common animation patterns

### State Management
- **Theme State**: Managed via ThemeProvider context
- **Navigation State**: Local state in App component
- **Component State**: Local useState hooks for component-specific state
- **No External State Library**: Currently uses only React's built-in state management

### Performance Considerations
- **Lazy Loading**: Images and heavy components should be lazy loaded
- **Animation Optimization**: Use `transform` and `opacity` for smooth animations
- **Bundle Optimization**: Vite handles code splitting and bundling
- **Asset Optimization**: Images should be optimized for web delivery

## Customization Guidelines

### Adding New Services/Products
- Update constants in `src/constants.ts`
- Create or update relevant page components
- Ensure proper navigation integration
- Add appropriate animations and transitions

### Theme Customization
- Modify CSS variables in global stylesheets
- Update Tailwind config for new design tokens
- Test in both light and dark modes
- Maintain accessibility contrast ratios

### Animation Customization
- Follow established motion patterns
- Use Framer Motion variants for consistency
- Test performance on lower-end devices
- Ensure animations respect prefers-reduced-motion

## Business Context

This website serves **Nano Computing ICT Solutions**, positioned as a premium technology consultancy focusing on:
- Ecosystem Management
- Network Architecture  
- Surveillance Systems
- Data Recovery
- Hardware Sales

The design emphasizes luxury, professionalism, and technical expertise through:
- Premium animations and transitions
- Glassmorphism effects
- Sophisticated color schemes
- Professional imagery and layout

## Integration Notes

### Third-Party Services
- **Analytics**: Ready for Google Analytics or similar integration
- **Forms**: Contact forms ready for backend integration
- **Media**: Video content and image optimization implemented
- **SEO**: Meta tags and structured data can be added

### Deployment Considerations
- **Static Site**: Can be deployed to any static hosting service
- **Build Output**: Located in `build/` directory (configured in Vite)
- **Asset Handling**: Public assets served from `public/` directory
- **Environment Variables**: Can be added for different deployment environments
