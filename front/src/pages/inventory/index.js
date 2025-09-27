import styles from './style.module.css';
import api from '../../api'
import { Container, Main, Table, InventoryFilters, Pagination } from '../../components'
import { useInventoryList, useInventoryFilters } from '../../utils/index.js'
import { useEffect, useCallback, useState } from 'react'
import { InventoryColumns } from '../../columns/index.js'


const Inventory = () => {
  const {
    inventorylist,
    setInventoryList,
    inventoryPage,
    setInventoryPage,
    inventoryCount, 
    setInventoryCount,
     } = useInventoryList()


  const getInventoryList = ({ page = 1 , limit = 20}) => {
    api.getInventoryList({ page, limit })
      .then(res => {
        const { results, count } = res
        setInventoryList(results);
        setInventoryCount(count);
      });
  }

  useEffect(_ => {
    getInventoryList({ page: inventoryPage})
  }, [inventoryPage])

  const columns = InventoryColumns();
  const {filteredData, ...filters} = useInventoryFilters(inventorylist);
  const [globalFilter, setGlobalFilter] = useState('');

  
  return <Main>
    <Container className={styles.inventory}>
      <InventoryFilters
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        {...filters}
      />
      <Table 
        data={inventorylist} 
        columns={columns} 
        className={styles}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Pagination
        count={inventoryCount}
        limit={20}
        page={inventoryPage}
        onPageChange={page => setInventoryPage(page)}
      />
    </Container>
  </Main>
}

export default Inventory