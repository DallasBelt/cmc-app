import React from 'react';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const columns = [
  {
    accessorKey: 'fullName',
    header: 'Nombres',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'specialty',
    header: 'Especialidad',
  },
  {
    accessorKey: 'lastSeen',
    header: 'Última sesión',
  },
];

const data = [
  {
    fullName: 'John Doe',
    email: 'john@example.com',
    specialty: 'Cardiology',
    lastSeen: '2024-07-10',
  },
  {
    number: 2,
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    specialty: 'Dermatology',
    lastSeen: '2024-07-09',
  },
  // Agrega más datos aquí...
];

export function MedicsTable({ columns, data }) {
  var _a;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return React.createElement(
    'div',
    { className: 'rounded-md border' },
    React.createElement(
      Table,
      null,
      React.createElement(
        TableHeader,
        null,
        table.getHeaderGroups().map((headerGroup) =>
          React.createElement(
            TableRow,
            { key: headerGroup.id },
            headerGroup.headers.map((header) => {
              return React.createElement(
                TableHead,
                { key: header.id },
                header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
              );
            })
          )
        )
      ),
      React.createElement(
        TableBody,
        null,
        (
          (_a = table.getRowModel().rows) === null || _a === void 0
            ? void 0
            : _a.length
        )
          ? table.getRowModel().rows.map((row) =>
              React.createElement(
                TableRow,
                {
                  key: row.id,
                  'data-state': row.getIsSelected() && 'selected',
                },
                row
                  .getVisibleCells()
                  .map((cell) =>
                    React.createElement(
                      TableCell,
                      { key: cell.id },
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )
                  )
              )
            )
          : React.createElement(
              TableRow,
              null,
              React.createElement(
                TableCell,
                { colSpan: columns.length, className: 'h-24 text-center' },
                'No results.'
              )
            )
      )
    )
  );
}

export default MedicsTable;
