import styles from './style.module.css'
import { Container, Main, Table, Pagination } from '../../components'
import { useConsumables } from '../../utils/index.js'
import { useEffect, useState } from 'react'
import api from '../../api'
import { ConsumablesColumns } from '../../columns/index.js'


const Consumables = () => {
  const {
    consumables,
    setConsumables,
    consumablesPage,
    setConsumablesPage,
    consumablesCount,
    setConsumablesCount,
    navigate
  } = useConsumables()

  const getConsumables = ({ page = 1 , limit = 20}) => {
    api.getConsumables({ page, limit })
      .then(res => {
        const { results, count } = res
        setConsumables(results)
        setConsumablesCount(count)
      });
  }

  useEffect(_ => {
    getConsumables({ page: consumablesPage})
  }, [consumablesPage])
  
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
          clickTr={(item) => (navigate(`/consumables/${item.id}`))}
      />
      <Pagination
        count={consumablesCount}
        limit={20}
        page={consumablesPage}
        onPageChange={page => setConsumablesPage(page)}
      />
    </Container>

  </Main>
}

export default Consumables