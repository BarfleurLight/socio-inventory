import { useState } from "react";


export default function useModels () {
    const [ models, setModels] = useState([])
    const [ modelPage, setModelPage ] = useState(1)
    const [ modelCount, setModelCount ] = useState(0)
    


return {
    models,
    setModels,
    modelPage,
    setModelPage,
    modelCount,
    setModelCount 
  }
}