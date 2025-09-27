import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function useConsumables () {
    const [ consumables, setConsumables ] = useState([])
    const navigate = useNavigate();
    const [ consumablesPage, setConsumablesPage ] = useState(1)
    const [ consumablesCount, setConsumablesCount ] = useState(0)

return {
    consumables,
    setConsumables,
    consumablesPage,
    setConsumablesPage,
    consumablesCount,
    setConsumablesCount,
    navigate
  }
}