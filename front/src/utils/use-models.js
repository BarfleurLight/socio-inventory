import { useState } from "react";


export default function useModels () {
    const [ models, setModels] = useState([])

return {
    models,
    setModels
  }
}