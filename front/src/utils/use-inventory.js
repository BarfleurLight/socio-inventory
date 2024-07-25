import { useState } from "react";


export default function useInventory () {
    const [ inventory , setInventory ] = useState([])

return {
    inventory,
    setInventory
  }
}