import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';

const mockData = [
  { id: 1, name: 'Test User 1', email: 'test1@example.com' },
  { id: 2, name: 'Test User 2', email: 'test2@example.com' },
];

const mockColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as const },
  { key: 'email', title: 'Email', dataIndex: 'email' as const },
];

describe('DataTable', () => {
  it('renders table headers and data correctly', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);

    // Check for headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // Check for data
    expect(screen.getByText('Test User 1')).toBeInTheDocument();
    expect(screen.getByText('test2@example.com')).toBeInTheDocument();
  });

  it('shows the loading state', () => {
    render(<DataTable data={[]} columns={mockColumns} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows the empty state', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});