import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function useInventoryList () {
    const [ inventorylist, setInventoryList ] = useState([])
    const navigate = useNavigate();
    const [ inventoryPage, setInventoryPage ] = useState(1)
    const [ inventoryCount, setInventoryCount ] = useState(0)

return {
    inventorylist,
    setInventoryList,
    inventoryPage,
    setInventoryPage,
    inventoryCount, 
    setInventoryCount,
    navigate
  }
}