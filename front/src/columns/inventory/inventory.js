import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react'
import styles from './style.module.css';
import { Img } from '../../components';


const InventoryColumns = () => {
  const navigate = useNavigate();

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
        cell: ({ row }) => <span>{row.original.fullname}</span>,
        enableSorting: true,
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
        enableSorting: true,
      },
      { 
        header: 'Инв. номер', 
        accessorKey: 'serial_number',
        enableSorting: true,
        cell: ({ row }) => <span>{row.original.serial_number}</span>,
      },
      {
        header: 'Ip/MAC', 
        accessorKey: 'ip',
        enableSorting: true,
        cell: ({ row }) => <span>
            {row.original.ip}{'\n'}{row.original.mac}
          </span>,
      },
      {
        header: 'Статус \n док./реал.',
        cell: ({ row }) => <span>
            {row.original.status_doc}{'\n'}{row.original.status_real}
          </span>,
        accessorKey: 'status_doc',
        enableSorting: true,
        meta: {
          filterVariant: 'select',
        },
      },
      // { 
      //   header: 'Статус онлайн', 
      //   accessorKey: 'status_online',
      //   enableSorting: true,
      // },
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
    [navigate]
  );
};

  export default InventoryColumns