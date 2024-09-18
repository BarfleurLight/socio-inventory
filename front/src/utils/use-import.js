import { useState } from "react";


export default function useImport () {
    const [ listImport, setImport ] = useState([])
    const [ currentImport, setCurruntImport] = useState([])
    const [ currentInventory, setCurruntInventory] = useState([])


return {
    listImport,
    setImport,
    currentImport,
    setCurruntImport,
    currentInventory,
    setCurruntInventory
  }
}