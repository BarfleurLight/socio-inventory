import styles from './style.module.css';
import api from '../../api'
import { Container, Main, Table, InventoryFilters } from '../../components'
import { useInventoryList, useInventoryFilters } from '../../utils/index.js'
import { useEffect, useCallback, useState } from 'react'
import { InventoryColumns } from '../../columns/index.js'


const Inventory = () => {
  const {inventorylist, setInventoryList } = useInventoryList()

  const getInventoryList = useCallback(() => {
      api
        .getInventoryList()
        .then(res => {
          const { results } = res
          setInventoryList(results)
        });
    }, [setInventoryList])

  useEffect(_ => {
    getInventoryList()
    }, [getInventoryList])

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
        data={filteredData} 
        columns={columns} 
        className={styles}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        nav='/inventory'
      />
    </Container>
  </Main>
}

export default Inventory