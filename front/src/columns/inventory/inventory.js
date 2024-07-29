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
        cell: ({ row }) => (<Img className={styles.image} src={row.original.image}/>)
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
};

  export default InventoryColumns