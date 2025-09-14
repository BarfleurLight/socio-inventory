import { useMemo } from 'react'
import styles from './style.module.css';

const ImportColumns = () => {

  const formatName = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length === 3) {
      const [firstName, middleName, lastName] = parts;
      const initials = `${middleName[0]}.${lastName[0]}.`;
      return `${firstName} ${initials}`;
    }
    return fullName;
  };

  const formatCell = (row, fieldName, formatter = null) => {
    const curValue = row.original.inventory_current[fieldName];
    const prevValue = row.original.inventory_previous?.[fieldName] ?? '---';

    const formattedCurrent = formatter ? formatter(curValue) : curValue;
    const formattedPrevious = formatter ? formatter(prevValue) : prevValue;
    const hasChanged = formattedCurrent === formattedPrevious

    if (hasChanged) {
      return (
        <div>
          <div>{formattedPrevious}</div>
          <div>{formattedCurrent}</div>
        </div>
      );
    }

    return (
      <div>
        <div className={styles.oldValue}>{formattedPrevious}</div>
        <div className={styles.newValue}>{formattedCurrent}</div>
      </div>
    );
  }

  return useMemo(
    () => [
      { 
        header: 'Статус', 
        accessorKey: 'status',
        cell: ({ row }) => (
          <span className={
            row.original.inventory_previous === null 
              ? styles.statusCreate 
              : styles.statusUpdate
          }>
            {row.original.inventory_previous === null ? 'CREATE' : 'UPDATE'}
          </span>
        ),
        enableSorting: true,
      },
      { 
        header: 'Полное название', 
        accessorKey: 'fullname',
        cell: ({ row }) => row.original.inventory_current.fullname,
        enableSorting: true,
      },
      { 
        header: 'Инв. номер', 
        accessorKey: 'serial_number',
        cell: ({ row }) => row.original.inventory_current.serial_number,
        enableSorting: true,
      },
      {
        header: 'Состояние',
        accessorKey: 'status_doc',
        cell: ({ row }) => formatCell(row, 'status_doc'),
        enableSorting: true,
      },
      {
        header: 'Ответственный',
        accessorKey: 'current_responsible',
        cell: ({ row }) => formatCell(row, 'current_responsible', formatName),
        enableSorting: true,
      },
      {
        header: 'Команата',
        accessorKey: 'room_doc',
        cell: ({ row }) => formatCell(row, 'room_doc'),
        enableSorting: true,
      },
      {
        header: 'Балансовая стоимость',
        accessorKey: 'balans_price',
        cell: ({ row }) => formatCell(row, 'balans_price'),
        enableSorting: true,
      },
    ],
    []
  );
};

export default ImportColumns;