import styles from './style.module.css'
import api from '../../api'
import cn from 'classnames'
import { Container, Main, Button, Table,  ImportNewCard, ImportOldCard, FileInput } from '../../components'
import { useImport } from '../../utils/index.js'
import { ImportColumns } from '../../columns/index.js'
import { useEffect, useCallback, useState } from 'react'


const Import = () => {
  const {
    listImport,
    setImport,
    currentImport,
    setCurruntImport,
    currentInventory,
    setCurruntInventory
  } = useImport()

  const [downloadFile, setDownloadFile] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)

  const handleFileUpload = (file) => {
    setCurrentFile(file)
    
    api.downloadFile(file)
      .then(response => {
        setDownloadFile(response)
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error)
        setDownloadFile(null)
      })
  }

  const getImport = useCallback(() => {
    api.getImports()
      .then(res => {
        const { results } = res;
        setImport(results);
      });
  }, [setImport]);

  useEffect(_ => {
    getImport()
    }, [getImport])


  const getCurruntInventory = useCallback(({ id, serial_number}) => {
    api.getInventory({ id, serial_number})
      .then(res => {
        const { results } = res;
        setCurruntInventory(results);
      });
  }, [setCurruntInventory]);

  const getCurruntImport = useCallback((id) => {
    api.getImport({id})
      .then(res => {
        const { results } = res;
        setCurruntImport(results);
        getCurruntInventory({
          id: null,
          serial_number: results.serial_number})
      });
  }, [setCurruntImport, getCurruntInventory]);

  const [globalFilter, setGlobalFilter] = useState('');
  const columns = ImportColumns();
  const [isOpen, setIsOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  
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
    <div className={styles.body}>
      <div className={styles.left}>
        <Table 
          data={listImport}
          columns={columns} 
          className={styles}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          clickTr={(id) => {
            if (isOpen) {
              setTimeout(() => getCurruntImport(id), 300);
            } else {
              getCurruntImport(id)
            }
            setIsOpen(false);
            setCardOpen(true);
            }}
        />
      </div>
      <div className={cn(styles.right, {[styles.open]: cardOpen})}
      >
        <div className={cn(styles.top, {[styles.show]: isOpen})}>
          <ImportOldCard 
            {...currentInventory} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
          />
        </div>
        <div className={styles.bot}>
          <ImportNewCard {...currentImport}/>
        </div>
      </div>
      <div 
        className={cn(styles.back, {[styles.open]: cardOpen})}
        onClick={() => {
          if (isOpen) {
            setTimeout(() => setCardOpen(false), 300);
          } else {
            setCardOpen(false)
          }
          setIsOpen(false);
          }}></div>
    </div>
    <div >
      <Button>Удалить выбраные</Button>
      <Button>Добавить выбраные</Button>  
    </div>

    </Container>
  </Main>
}

export default Import