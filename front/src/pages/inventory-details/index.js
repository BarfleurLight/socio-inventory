import React from 'react';
import { useParams } from 'react-router-dom';

const InventoryDetail = () => {
  const { id } = useParams();
  

  return (
    <div>
      <h1>Inventory Detail</h1>
      <p>Inventory ID: {id}</p>
      {/* Здесь вы можете использовать id для запроса данных или других действий */}
    </div>
  );
};

export default InventoryDetail;