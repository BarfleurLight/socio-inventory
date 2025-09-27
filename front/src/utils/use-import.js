import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function useImport () {
    const [updateList, setUpdateList] = useState([])
    const [currentFile, setCurrentFile] = useState(null)
    const navigate = useNavigate();

return {
    updateList,
    setUpdateList,
    currentFile, 
    setCurrentFile,
    navigate
  }
}