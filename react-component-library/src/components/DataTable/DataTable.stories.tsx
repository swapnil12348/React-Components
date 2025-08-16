// src/components/DataTable/DataTable.stories.tsx - (VERSION FOR TESTING)

import type { Meta, StoryObj } from '@storybook/react';

// ---- CHANGE 1: The 'action' import is completely removed ----
// import { action } from '@storybook/addon-actions'; 

import { DataTable } from './DataTable';
import type { Column } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'Admin' | 'User' | 'Guest';
}

const mockData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 34, role: 'User' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

export const Default: Story = {
  args: {
    data: mockData,
    columns: columns,
  },
};

export const Selectable: Story = {
  args: {
    ...Default.args,
    selectable: true,
    // ---- CHANGE 2: Using console.log instead of action() ----
    onRowSelect: (selectedRows) => console.log('Selected Rows:', selectedRows),
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
  },
};