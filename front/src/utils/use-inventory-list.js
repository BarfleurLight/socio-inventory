import { useState } from "react";


export default function useInventoryList () {
    const [ inventorylist, setInventoryList ] = useState([])

return {
    inventorylist,
    setInventoryList
  }
}