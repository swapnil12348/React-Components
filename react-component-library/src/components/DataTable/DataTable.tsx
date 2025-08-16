import React, { useState, useMemo, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronUp, ChevronDown, LoaderCircle } from 'lucide-react';

// Define the shape of a column
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}

// Define the component's props using a generic
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  // Assuming each data item has a unique 'id' property
  // A better approach would be a `getRowId` prop
  initialSelectedRowIds?: (string | number)[];
}

type SortConfig<T> = {
  key: keyof T;
  direction: 'ascending' | 'descending';
} | null;

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  initialSelectedRowIds = [],
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set(initialSelectedRowIds));

  // Effect to call onRowSelect when selection changes
  useEffect(() => {
    if (onRowSelect) {
      const selectedItems = data.filter(item => selectedRows.has(item.id));
      onRowSelect(selectedItems);
    }
  }, [selectedRows, data, onRowSelect]);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = new Set(data.map(n => n.id));
      setSelectedRows(newSelecteds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string | number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };
  
  const isSelected = (id: string | number) => selectedRows.has(id);
  const numSelected = selectedRows.size;
  const rowCount = data.length;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {column.sortable ? (
                  <button onClick={() => requestSort(column.dataIndex)} className="flex items-center space-x-1 group">
                    <span>{column.title}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {sortConfig?.key === column.dataIndex ? (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      ) : (
                        <ChevronUp size={16} className="text-gray-400" />
                      )}
                    </span>
                  </button>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center p-8">
                 <div className="flex justify-center items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <LoaderCircle className="animate-spin" />
                    <span>Loading...</span>
                 </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center p-8 text-gray-500 dark:text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((item) => {
              const isRowSelected = isSelected(item.id);
              return (
                <tr
                  key={item.id}
                  aria-selected={isRowSelected}
                  className={clsx(
                    'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                    isRowSelected && 'bg-blue-50 dark:bg-blue-900/20'
                  )}
                >
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={isRowSelected}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {column.render ? column.render(item[column.dataIndex], item) : String(item[column.dataIndex])}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}