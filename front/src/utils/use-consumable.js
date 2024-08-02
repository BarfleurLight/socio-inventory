import { useState } from "react";


export default function useConsumable () {
    const [ consumable, setConsumable ] = useState([])

return {
    consumable,
    setConsumable
  }
}