'use client';

import { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

export const DataTable = ({
  columns,
  data,
  globalFilterFn,
  defaultSort,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
}) => {
  const [sorting, setSorting] = useState(defaultSort || []);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    state: {
      sorting,
      globalFilter,
      rowSelection: enableRowSelection ? (rowSelection ?? {}) : {},
    },
    onRowSelectionChange: enableRowSelection ? onRowSelectionChange : undefined,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
        <Input
          placeholder='Buscar...'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='w-full lg:max-w-sm'
        />
        <span className='text-sm text-muted-foreground'>
          {table.getFilteredRowModel().rows.length} registro(s) en total
        </span>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-end'>
        {enableRowSelection && (
          <div className='text-muted-foreground flex-1 text-sm'>
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
          </div>
        )}
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
