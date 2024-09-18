import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function useInventoryList () {
    const [ inventorylist, setInventoryList ] = useState([])
    const navigate = useNavigate();

return {
    inventorylist,
    setInventoryList,
    navigate
  }
}