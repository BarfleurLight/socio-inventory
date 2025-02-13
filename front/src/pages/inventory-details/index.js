import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InventoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isValidId = /^\d+$/.test(id);

  React.useEffect(() => {
    if (!isValidId) {
      navigate('/error'); 
    }
  }, [isValidId, navigate]);

  return (
    <div>
      <h1>Inventory Detail</h1>
      <p>Inventory ID: {id}</p>
      {/* Здесь вы можете использовать id для запроса данных или других действий */}
    </div>
  );
};

export default InventoryDetail;