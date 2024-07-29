import { useMemo, useState } from 'react';

const useInventoryFilters = (inventorylist) => {
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

  return {
    statusFilter,
    setStatusFilter,
    responsibleFilter,
    setResponsibleFilter,
    roomFilter,
    setRoomFilter,
    uniqueStatuses,
    uniqueResponsibles,
    filteredData,
  };
};

export default useInventoryFilters;