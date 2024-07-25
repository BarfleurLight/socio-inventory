import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../index';
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

const InventoryTable = ({ inventorylist }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  

  const [statusFilter, setStatusFilter] = useState('');
  const [responsibleFilter, setResponsibleFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');

  // Получение уникальных значений для фильтров
  const uniqueStatuses = useMemo(() => {
    return [...new Set(inventorylist.map(item => item.status_real))];
  }, [inventorylist]);

  const uniqueResponsibles = useMemo(() => {
    return [...new Set(inventorylist.map(item => item.current_responsible))];
  }, [inventorylist]);

  const formatName = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length === 3) {
      const [firstName, middleName, lastName] = parts;
      const initials = `${middleName[0]}.${lastName[0]}.`;
      return `${firstName} ${initials}`;
    }
    return fullName; // на случай, если формат имени не соответствует ожиданиям
  };

  const columns = useMemo(
    () => [
      { 
        header: 'Фото', 
        id: 'image',
        accessorKey: 'image',
        enableSorting: false,
        cell: ({ row }) => (
          <img src={row.original.image} alt="Фото" style={{ width: '50px', height: '50px' }} />
        )
      },
      { 
        header: 'Полное название', 
        accessorKey: 'fullname',
        enableSorting: true,  // Включаем сортировку для столбца
      },
      {
        header: 'Модель',
        accessorKey: 'model',
        cell: ({ row }) => {
          const model_id = row.original.model.id;
          const model_name = row.original.model.name;
          return (
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/model/${model_id}`);
              }}
              className={styles.link}
            >{model_name}</span>
          );
        },
        enableSorting: true,  // Включаем сортировку для столбца
      },
      { 
        header: 'Инв. номер', 
        accessorKey: 'serial_number',
        enableSorting: true,  // Включаем сортировку для столбца
      },
      {
        header: 'Статус док./реал.',
        accessorFn: row => `${row.status_doc}${`/`}${row.status_real}`,
        accessorKey: 'status',
        enableSorting: true,  // Включаем сортировку для столбца
        meta: {
          filterVariant: 'select',
        },
      },
      { 
        header: 'Статус онлайн', 
        accessorKey: 'status_online',
        enableSorting: true,  // Включаем сортировку для столбца
      },
      {
        header: 'Ответственный',
        accessorKey: 'current_responsible',
        cell: ({ row }) => <span>{formatName(row.original.current_responsible)}</span>,
        enableSorting: true,  // Включаем сортировку для столбца
      },
      {
        header: 'Комната док./реал.',
        accessorKey: 'room',
        accessorFn: row => `${row.room_doc}${`/`}${row.room_real}`,
        enableSorting: true,  // Включаем сортировку для столбца
      },
    ],
    [navigate]
  );

  const filteredData = useMemo(() => {
    return inventorylist.filter(item => {
      const statusMatch = !statusFilter || item.status_real === statusFilter;
      const responsibleMatch = !responsibleFilter || item.current_responsible === responsibleFilter;
      const roomDocString = String(item.room_doc || ''); // Конвертация в строку
      const roomRealString = String(item.room_real || ''); // Конвертация в строку
      const roomMatch = !roomFilter || (roomDocString.includes(roomFilter) || roomRealString.includes(roomFilter));
      return statusMatch && responsibleMatch && roomMatch;
    });
  }, [inventorylist, statusFilter, responsibleFilter, roomFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className={styles.container}>
      <Filters
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        responsibleFilter={responsibleFilter}
        setResponsibleFilter={setResponsibleFilter}
        roomFilter={roomFilter}
        setRoomFilter={setRoomFilter}
        uniqueStatuses={uniqueStatuses}
        uniqueResponsibles={uniqueResponsibles}
    />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={styles[header.column.columnDef.accessorKey]}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
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
              onClick={() => navigate(`/inventory/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles[cell.column.columnDef.accessorKey]}>
                  <div className={styles.test}>
                    <span>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;