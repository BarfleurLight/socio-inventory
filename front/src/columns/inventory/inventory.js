import { useMemo } from 'react'
import styles from './style.module.css';
import { Img, LinkComponent } from '../../components';


const InventoryColumns = () => {

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
        header: 'Фото', 
        id: 'image',
        accessorKey: 'image',
        enableSorting: false,
        cell: ({ row }) => <Img 
          className={styles.image} 
          src={row.original.image}
          />,
      },
      { 
        header: 'Полное название', 
        accessorKey: 'fullname',
        cell: ({ row }) => <div>
          <LinkComponent 
              href={`/inventory/${row.original.id}`}
              title={row.original.fullname}
            />
          <div 
            className={styles.ser_num}
            >Серийный номер:{row.original.serial_number}
          </div>
        </div>,
        enableSorting: true,
      },
      {
        header: 'Модель',
        accessorKey: 'model',
        cell: ({ row }) => <LinkComponent 
              href={`/model/${row.original.model.id}`}
              title={row.original.model.name}
            />,
        enableSorting: true,
      },
      {
        header: 'Ip', 
        accessorKey: 'ip',
        enableSorting: true,
        accessorFn: row => `${row.ip.join('\n')}`,
      },
      {
        header: 'MAC', 
        accessorKey: 'mac',
        enableSorting: true,
        accessorFn: row => `${row.mac.join('\n')}`,
      },
      {
        header: 'Статус \n док./реал.',
        accessorKey: 'status_doc',
        accessorFn: row => `${row.status_doc}${'\n'}${row.status_real}`,
        enableSorting: true,
      },
      {
        header: 'Ответств.',
        accessorKey: 'current_responsible',
        accessorFn: row => `${formatName(row.current_responsible)}`,
        enableSorting: true,
      },
      {
        header: 'Комната \n док./реал.',
        accessorKey: 'room',
        accessorFn: row => `${row.room_doc}${'\n'}${row.room_real}`,
        enableSorting: true,
      },
    ],
    []
  );
};

  export default InventoryColumns