# React Component Development Assignment

This project contains two reusable React components: `InputField` and `DataTable`, built with React, TypeScript, TailwindCSS, and documented with Storybook.

## Tech Stack

-   **React:** UI Library
-   **TypeScript:** Static Typing
-   **TailwindCSS:** Utility-first CSS Framework
-   **Storybook:** Component Documentation and Workshop
-   **Vite:** Build Tool
-   **Vitest & React Testing Library:** Testing
-   **CVA (Class Variance Authority):** For creating a flexible, type-safe variant system.

## Project Structure

The project uses a feature-sliced approach where each component lives in its own directory under `src/components`. This directory contains the component itself, its stories, and its tests, promoting scalability and maintainability.

```
src/components/
├── DataTable/
│   ├── DataTable.tsx
│   ├── DataTable.stories.tsx
│   └── DataTable.test.tsx
└── InputField/
    ├── InputField.tsx
    ├── InputField.stories.tsx
    └── InputField.test.tsx
```

## Approach Description

-   **InputField:** This component was built using `cva` to manage its numerous visual variants (`filled`, `outlined`, `ghost`), sizes, and states (`invalid`, `disabled`). This approach keeps the styling logic clean, declarative, and easily extensible. It also includes optional features like a password visibility toggle and a clear button.

-   **DataTable:** This is a generic and type-safe component. It uses React hooks (`useState`, `useMemo`) to manage internal state for sorting and row selection. `useMemo` is used to optimize performance by only re-sorting the data when the data itself or the sort configuration changes.

## Available Scripts

### `npm install`
Installs all the required dependencies.

### `npm run dev`
Runs the app in development mode.

### `npm run storybook`
Starts the Storybook development server. This is the primary way to view and develop the components.

### `npm run build-storybook`
Builds the static Storybook site for deployment.

### `npm test`
Runs the unit tests using Vitest.