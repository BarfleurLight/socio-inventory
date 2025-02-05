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

  return  useMemo(
    () => [
      {
        id: 'selection',
        accessorKey: 'selection',
        enableSorting: false,
        header: ({ table }) => (
        <label 
          className={styles.ch_lb}
        >
          <input
            type="checkbox"
            className={styles.ch_in}
            {...{
              checked: table.getIsAllRowsSelected(),
              // indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
          <span className={styles.ch_sp}></span>
        </label>
        ),
        cell: ({ row }) => (
        <label 
        className={styles.ch_lb}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault(); 
          row.getToggleSelectedHandler()(e);
        }}

        >
          <input
            type="checkbox"
            className={styles.ch_in}
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: row.getToggleSelectedHandler(),
              onClick: e => e.stopPropagation(), 
            }}
          />
          <span className={styles.ch_sp}></span>
        </label>

        ),
      },
      { 
        header: 'Полное название', 
        accessorKey: 'fullname',
        cell: ({ row }) => <span>{row.original.fullname}</span>,
        enableSorting: true,  // Включаем сортировку для столбца
      },
      { 
        header: 'Инв. номер', 
        accessorKey: 'serial_number',
        enableSorting: true,
      },
      {
        header: 'Состояние',
        accessorKey: 'status_doc',
        enableSorting: true,
      },
      {
        header: 'Ответственный',
        accessorKey: 'current_responsible',
        cell: ({ row }) => <span>{formatName(row.original.current_responsible)}</span>,
        enableSorting: true,
      },
      {
        header: 'Дата приянтия к учёту',
        accessorKey: 'according_data',
        enableSorting: true,
      },
      // {
      //   header: 'Балансовая стоимость',
      //   accessorKey: 'balans_price',
      //   enableSorting: true,  // Включаем сортировку для столбца
      // },
    ],
    []
  );
};

  export default ImportColumns