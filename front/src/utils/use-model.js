import { useState } from "react";


export default function useModel () {
    const [ model, setModel ] = useState([])
    const [ modelPage, setModelPage ] = useState(1)
    const [ modelCount, setModelCount ] = useState(0)

return {
    model,
    setModel,
    modelPage,
    setModelPage,
    modelCount,
    setModelCount 
  }
}