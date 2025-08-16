# React Component Library

A collection of flexible, theme-aware React components built with modern development practices and comprehensive tooling.

## 🌟 Overview

This project provides two highly reusable React components - `InputField` and `DataTable` - designed for scalability, type safety, and developer experience. Built with React, TypeScript, and TailwindCSS, each component offers extensive customization options while maintaining consistency and accessibility.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI Library |
| **TypeScript** | Static typing and enhanced developer experience |
| **TailwindCSS** | Utility-first CSS framework for consistent styling |
| **CVA (Class Variance Authority)** | Type-safe variant system for component styling |
| **Storybook** | Component documentation and interactive development |
| **Vite** | Fast build tool and development server |
| **Vitest** | Unit testing framework |
| **React Testing Library** | Component testing utilities |

## 📁 Project Structure

The project follows a feature-sliced architecture where each component is self-contained with its implementation, stories, and tests:

```
src/components/
├── DataTable/
│   ├── DataTable.tsx          # Component implementation
│   ├── DataTable.stories.tsx  # Storybook stories
│   └── DataTable.test.tsx     # Unit tests
└── InputField/
    ├── InputField.tsx
    ├── InputField.stories.tsx
    └── InputField.test.tsx
```

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
# Start development server
npm run dev

# Launch Storybook (recommended for component development)
npm run storybook
```

### Testing
```bash
# Run unit tests
npm test
```

### Build
```bash
# Build for production
npm run build

# Build Storybook for deployment
npm run build-storybook
```

## 🧩 Components

### InputField

A comprehensive input component with built-in validation, loading states, and multiple visual variants.

**Key Features:**
- Multiple variants (`filled`, `outlined`, `ghost`)
- Size variations (`sm`, `md`, `lg`)
- Built-in validation states and error handling
- Optional clear button and loading spinner
- Password visibility toggle support
- Fully accessible with ARIA attributes

#### Props Reference

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `label` | `string` | Label text displayed above the input | `undefined` |
| `value` | `string` | Controlled input value | `undefined` |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | Value change handler | `undefined` |
| `placeholder` | `string` | Placeholder text for empty input | `undefined` |
| `helperText` | `string` | Helper text below the input | `undefined` |
| `errorMessage` | `string` | Error message (overrides helperText when invalid) | `undefined` |
| `type` | `string` | HTML input type | `'text'` |
| `disabled` | `boolean` | Disable the input | `false` |
| `invalid` | `boolean` | Show error state styling | `false` |
| `loading` | `boolean` | Show loading spinner and disable input | `false` |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | Visual style variant | `'outlined'` |
| `size` | `'sm' \| 'md' \| 'lg'` | Component size | `'md'` |
| `showClearButton` | `boolean` | Show clear button when input has value | `false` |
| `onClear` | `() => void` | Clear button click handler | `undefined` |

### DataTable

A powerful, generic data table component with sorting, selection, and loading states.

**Key Features:**
- Type-safe generic implementation
- Built-in sorting functionality
- Row selection with checkboxes
- Loading and empty states
- Custom cell rendering
- Optimized performance with `useMemo`

#### Props Reference

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `data` | `T[]` | Array of data objects (must have unique `id`) | `[]` |
| `columns` | `Column<T>[]` | Column configuration array | `[]` |
| `loading` | `boolean` | Show loading state | `false` |
| `selectable` | `boolean` | Enable row selection | `false` |
| `onRowSelect` | `(selectedRows: T[]) => void` | Selection change handler | `undefined` |

#### Column Configuration

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `key` | `string` | Unique column identifier | ✅ |
| `title` | `string` | Column header text | ✅ |
| `dataIndex` | `keyof T` | Data object key to display | ✅ |
| `sortable` | `boolean` | Enable column sorting | ❌ |
| `render` | `(value: any, record: T) => ReactNode` | Custom cell renderer | ❌ |

## 💡 Usage Examples

### Basic InputField Implementation

```tsx
import { useState } from 'react';
import { InputField } from './components/InputField/InputField';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form>
      <InputField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        invalid={!!errors.email}
        errorMessage={errors.email}
        variant="outlined"
        size="md"
      />
      
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        invalid={!!errors.password}
        errorMessage={errors.password}
        variant="outlined"
        size="md"
      />
    </form>
  );
}
```

### Advanced DataTable Implementation

```tsx
import { useState } from 'react';
import { DataTable, Column } from './components/DataTable/DataTable';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

function EmployeeManager() {
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@company.com',
      department: 'Engineering',
      salary: 95000,
      status: 'Active'
    },
    // ... more data
  ]);

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      title: 'Employee Name',
      dataIndex: 'name',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'department',
      title: 'Department',
      dataIndex: 'department',
      sortable: true,
    },
    {
      key: 'salary',
      title: 'Salary',
      dataIndex: 'salary',
      sortable: true,
      render: (salary) => `$${salary.toLocaleString()}`,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={employees}
      columns={columns}
      selectable
      onRowSelect={(selected) => {
        console.log('Selected employees:', selected);
      }}
    />
  );
}
```

## 🎯 Design Philosophy

### Component Architecture
- **Single Responsibility**: Each component focuses on one primary function
- **Composition over Inheritance**: Components are designed to work together seamlessly
- **Controlled Components**: All stateful interactions are managed by parent components

### Performance Optimizations
- **Memoized Computations**: DataTable uses `useMemo` for expensive operations
- **Efficient Re-renders**: Components only re-render when necessary props change
- **Bundle Optimization**: Tree-shakeable exports and minimal dependencies

### Developer Experience
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Storybook Integration**: Interactive documentation and component playground
- **Testing Coverage**: Comprehensive unit tests for all component features
- **Consistent APIs**: Predictable prop patterns across all components

## 🧪 Testing Strategy

Components are thoroughly tested using Vitest and React Testing Library, covering:

- **Unit Tests**: Individual component behavior and prop handling
- **Integration Tests**: Component interactions and state management
- **Accessibility Tests**: ARIA attributes and keyboard navigation
- **Visual Regression**: Storybook visual testing (when configured)

## 📚 Documentation

### Storybook
The primary documentation lives in Storybook, featuring:
- Interactive component playground
- Comprehensive prop controls
- Usage examples and best practices
- Accessibility guidelines

### API Reference
Each component includes detailed TypeScript interfaces and JSDoc comments for IDE support.

## 🤝 Contributing

1. Follow the established project structure
2. Maintain TypeScript strict mode compliance
3. Add comprehensive Storybook stories for new components
4. Include unit tests for all functionality
5. Update documentation for API changes

## 📄 License

This project is part of a React Component Development Assignment and is intended for educational purposes.

---

Built with ❤️ using modern React development practices
