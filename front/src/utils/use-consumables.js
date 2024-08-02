import { useState } from "react";


export default function useConsumables () {
    const [ consumables, setConsumables ] = useState([])

return {
    consumables,
    setConsumables
  }
}