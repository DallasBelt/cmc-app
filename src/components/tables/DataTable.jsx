// 'use client';

// import * as React from 'react';

// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';

// export function DataTable({ columns, data }) {
//   const isAdmin = sessionStorage.getItem('roles').includes('admin');

//   const [sorting, setSorting] = React.useState([
//     { id: isAdmin ? 'email' : 'lastName', desc: false },
//   ]);
//   const [globalFilter, setGlobalFilter] = React.useState('');

//   const getMedicValue = (row, columnId) => {
//     return isAdmin ? '' : row.getValue(columnId) || '';
//   };

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onGlobalFilterChange: setGlobalFilter,
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       sorting,
//       globalFilter,
//     },
//     initialState: {
//       pagination: {
//         pageSize: 10,
//       },
//     },
//     globalFilterFn: (row, columnId, filterValue) => {
//       const email = isAdmin ? row.getValue('email') || '' : '';
//       const dni = getMedicValue(row, 'dni');
//       const lastName = getMedicValue(row, 'lastName');
//       const firstName = getMedicValue(row, 'firstName');

//       return (
//         email.toLowerCase().includes(filterValue.toLowerCase()) ||
//         (!isAdmin &&
//           (lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
//             firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
//             dni.includes(filterValue)))
//       );
//     },
//   });

//   const handleGlobalFilterChange = (e) => {
//     setGlobalFilter(e.target.value);
//   };

//   return (
//     <>
//       <div className='flex flex-col gap-5'>
//         <div className='flex flex-col items-center gap-2.5 md:flex-row md:justify-between'>
//           <Input
//             placeholder='Buscar...'
//             value={globalFilter}
//             onChange={handleGlobalFilterChange}
//             className='w-full lg:max-w-sm'
//           />

//           <div className='text-sm text-muted-foreground'>
//             {table.getFilteredRowModel().rows.length} registros en total
//           </div>
//         </div>

//         <div className='rounded-md border'>
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && 'selected'}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className='h-24 text-center'
//                   >
//                     Sin resultados.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         <div className='flex flex-col space-y-5 items-center md:flex-row md:justify-end md:space-y-0'>
//           <div className='flex items-center space-x-2'>
//             <Button
//               variant='outline'
//               size='sm'
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Anterior
//             </Button>
//             <Button
//               variant='outline'
//               size='sm'
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Siguiente
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// src/components/tables/BaseDataTable.jsx
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

export const DataTable = ({ columns, data, globalFilterFn, defaultSort }) => {
  const [sorting, setSorting] = useState(defaultSort || []);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
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
    },
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
          {table.getFilteredRowModel().rows.length} registros en total
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
