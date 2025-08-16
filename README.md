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

# Component Library

A collection of flexible, theme-aware React components built for modern applications.

## 📖 Documentation

The primary, interactive documentation lives in our deployed Storybook. This README provides a summary of each component's props and basic usage examples.

## 🧩 Components

### InputField

A flexible and theme-aware input component with built-in validation states, icons, and variants.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `label` | `string` | Text that appears above the input field | `undefined` |
| `value` | `string` | The current value of the input | `undefined` |
| `onChange` | `(e: ChangeEvent) => void` | Callback function fired when input value changes | `undefined` |
| `placeholder` | `string` | Placeholder text when input is empty | `undefined` |
| `helperText` | `string` | Helper text that appears below the input | `undefined` |
| `errorMessage` | `string` | Error message when `invalid` is true. Overrides `helperText` | `undefined` |
| `type` | `string` | HTML input type (e.g., 'text', 'password', 'email') | `'text'` |
| `disabled` | `boolean` | Disables the input when true | `false` |
| `invalid` | `boolean` | Styles input to indicate error state | `false` |
| `loading` | `boolean` | Shows loading spinner and disables input | `false` |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | Visual style of the input field | `'outlined'` |
| `size` | `'sm' \| 'md' \| 'lg'` | Size of the input field | `'md'` |
| `showClearButton` | `boolean` | Displays 'X' button to clear input when it has value | `false` |
| `onClear` | `() => void` | Callback fired when clear button is clicked | `undefined` |

### DataTable

A generic, theme-aware data table with built-in support for sorting, row selection, loading, and empty states.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `data` | `T[]` | Array of data objects to display. Each must have unique `id` | `[]` |
| `columns` | `Column<T>[]` | Array of column configuration objects | `[]` |
| `loading` | `boolean` | Displays loading state in table body | `false` |
| `selectable` | `boolean` | Renders checkboxes for row selection | `false` |
| `onRowSelect` | `(selectedRows: T[]) => void` | Callback fired when row selection changes | `undefined` |

#### Column Object Shape

| Key | Type | Description | Required |
|-----|------|-------------|----------|
| `key` | `string` | Unique string key for the column | ✅ |
| `title` | `string` | Text to display in column header | ✅ |
| `dataIndex` | `keyof T` | Key of data object whose value displays in column cells | ✅ |
| `sortable` | `boolean` | Makes column header clickable to sort data | ❌ |
| `render` | `(value, record) => ReactNode` | Custom render function for cell content | ❌ |

## 🚀 Usage Example

```tsx
import { useState } from 'react';
import { InputField } from './components/InputField/InputField';
import { DataTable, Column } from './components/DataTable/DataTable';

// Define the type for our data
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

// Sample data and column definitions
const sampleUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
];

const userColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Full Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email Address',
    dataIndex: 'email',
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (role) => (
      <span style={{ color: role === 'Admin' ? 'crimson' : 'royalblue' }}>
        {role}
      </span>
    ),
  },
];

function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'sans-serif', 
      maxWidth: '800px', 
      margin: 'auto' 
    }}>
      <h1>Component Demo</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>InputField Demo</h2>
        <InputField
          label="Enter Your Name"
          placeholder="e.g., Jane Doe"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="This is a controlled component."
          showClearButton
          onClear={() => setInputValue('')}
        />
      </section>

      <section>
        <h2>DataTable Demo</h2>
        <DataTable
          data={sampleUsers}
          columns={userColumns}
          selectable
          onRowSelect={(selected) => {
            console.log('Selected rows:', selected);
          }}
        />
      </section>
    </div>
  );
}

export default App;
```

## 🎨 Features

- **Theme-aware**: Components adapt to your application's design system
- **TypeScript support**: Full type safety with TypeScript definitions
- **Flexible styling**: Multiple variants and sizes for different use cases
- **Accessibility**: Built with accessibility best practices in mind
- **Modern React**: Uses modern React patterns and hooks

## 📚 Additional Resources

For more detailed examples, interactive demos, and advanced usage patterns, visit our Storybook documentation.
