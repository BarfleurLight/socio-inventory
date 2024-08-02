import { useMemo } from 'react'
import styles from './style.module.css';
import { Img } from '../../components';


const ConsumablesColumns = () => {

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
        header: 'Название',
        accessorKey: 'name',
        cell: ({ row }) => <span className={styles.name}>{row.original.name}</span>,
        enableSorting: true,  // Включаем сортировку для столбца
      },
      { 
        header: 'Модели',
        accessorKey: 'models',
        cell: ({ row }) => {
          const models = row.original.models
          if (models.length > 0) {
            return (
              <select onClick={(e) => {e.stopPropagation()}}>
                {models.map(model =>
                  <option>{model.name}</option>
                  )}
              </select>
            )
            } else {
            return '---'
            }
        },
      },
      { 
        header: 'Тип', 
        accessorKey: 'type',
        enableSorting: true,  // Включаем сортировку для столбца
      },
      {
        header: 'Кол-во',
        accessorKey: 'count',
        enableSorting: true,  // Включаем сортировку для столбца
      },
    ],
    []
  );
};

  export default ConsumablesColumns