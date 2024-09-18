import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function useConsumables () {
    const [ consumables, setConsumables ] = useState([])
    const navigate = useNavigate();

return {
    consumables,
    setConsumables,
    navigate
  }
}