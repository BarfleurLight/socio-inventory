import styles from './style.module.css';
// import cn from 'classnames'
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

const Table = ({ data, columns, className, globalFilter, setGlobalFilter, clickTr, }) => {
  const [sorting, setSorting] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getRowId: row => row.id,
    state: {
      sorting,
      globalFilter,
      rowSelection: selectedRows,

    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setSelectedRows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={className[header.column.columnDef.accessorKey]}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: '˄',
                    desc: '˅',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={_ => clickTr && clickTr(row.original.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={className[cell.column.columnDef.accessorKey]}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <div>
        <label>Row Selection State:</label>
        <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
      </div> */}
      </table>
  );
};

export default Table;