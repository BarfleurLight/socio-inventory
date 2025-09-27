import styles from './style.module.css'
import api from '../../api'
import { Container, Main, Table, FileInput } from '../../components'
import { useImport } from '../../utils/index.js'
import { ImportColumns } from '../../columns/index.js'
import {  useState } from 'react'


const Import = () => {
  const {
    updateList,
    setUpdateList,
    currentFile,
    setCurrentFile,
    navigate
  } = useImport()

  const [globalFilter, setGlobalFilter] = useState('');
  const columns = ImportColumns();

  const handleFileUpload = (file) => {
    setCurrentFile(file)
    
    api.getImports(file)
      .then(response => {
        setUpdateList(response['results'])
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error)
        setUpdateList([])
      })
  }

  
  return <Main>
    <Container>
      <header>
        <div className={styles.filters}>
          <input
            type="text"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Поиск..."
            className={styles.globalFilter}
          />
        </div>
        <FileInput
          onChange={handleFileUpload}
          currentFile={currentFile}
        />
      </header>
      <Table 
        data={updateList}
        columns={columns} 
        className={styles}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        clickTr={(item) => navigate(`/inventory/${item.inventory_current.id}`)}
      />

    </Container>
  </Main>
}

export default Import