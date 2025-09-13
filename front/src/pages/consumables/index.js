import styles from './style.module.css'
import { Container, Main, Table } from '../../components'
import { useConsumables } from '../../utils/index.js'
import { useEffect, useState } from 'react'
import api from '../../api'
import { ConsumablesColumns } from '../../columns/index.js'


const Consumables = () => {
  const {
    consumables,
    setConsumables,
    navigate
  } = useConsumables()

  const getConsumables = () => {
    api.getConsumables()
      .then(res => {
        setConsumables(res);
      });
  }

  useEffect(_ => {
    getConsumables()
  }, [])
  
  const columns = ConsumablesColumns();
  const [globalFilter, setGlobalFilter] = useState('');

  return <Main>
    <Container className={styles.consumables}>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Поиск..."
        className={styles.filterConsumables}
      />
      <Table 
          data={consumables} 
          columns={columns} 
          className={styles}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          clickTr={(id) => (navigate(`/consumables/${id}`))}
      />
    </Container>
  </Main>
}

export default Consumables