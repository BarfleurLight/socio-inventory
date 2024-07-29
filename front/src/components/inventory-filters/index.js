import React from 'react';
import styles from './style.module.css'


const InventoryFilters = ({
  globalFilter,
  setGlobalFilter,
  statusFilter,
  setStatusFilter,
  responsibleFilter,
  setResponsibleFilter,
  roomFilter,
  setRoomFilter,
  uniqueStatuses = [],  // Инициализируем как пустой массив
  uniqueResponsibles = [], // Инициализируем как пустой массив
}) => {

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Поиск..."
        className={styles.filterInput}
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="">Реальный статус</option>
        {uniqueStatuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <select
        value={responsibleFilter}
        onChange={(e) => setResponsibleFilter(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="">Ответственный</option>
        {uniqueResponsibles.map(responsible => (
          <option key={responsible} value={responsible}>
            {responsible}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={roomFilter || ''}
        onChange={(e) => setRoomFilter(e.target.value)}
        placeholder="Комната"
        className={styles.room}
      />
    </div>
  );
};


export default InventoryFilters;