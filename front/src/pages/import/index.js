import styles from './style.module.css'
import api from '../../api'
import { Container, Main, Button, Table,  ImportNewCard, ImportOldCard } from '../../components'
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

  const getImport = useCallback(() => {
    api.getImports()
      .then(res => {
        const { results } = res;
        setImport(results);
      });
  }, [setImport]);

  // getImport()
  useEffect(_ => {
    getImport()
    }, [getImport])

  const downloadDocument = () => {
    api.downloadFile()
  }

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

  return <Main>
    <Container>
      <header>
        <div className={styles.filters}>
          Фильтры
        </div>
        <div className={styles.file}>
          <span>Имя файла</span>
          <Button
            clickHandler={downloadDocument}
            className={styles.button}
            disabled={false}
          >Добавить файл</Button>
        </div>
      </header>
    <div className={styles.body}>
      <div className={styles.left}>
        <Table 
          data={listImport}
          columns={columns} 
          className={styles}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          clickTr={getCurruntImport}
        />
      </div>
      <div className={styles.right}>

        {/* <div className={styles.top}> */}
        <ImportOldCard {...currentInventory}/>
        {/* </div> */}
        <div className={styles.bot}>
        <ImportNewCard {...currentImport}/>
        </div>
      </div>

    </div>
    <div >
      <Button>Удалить выбраные</Button>
      <Button>Добавить выбраные</Button>  
    </div>

    </Container>
  </Main>
}

export default Import