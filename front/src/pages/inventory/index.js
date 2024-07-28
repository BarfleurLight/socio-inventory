import { Container, Main, InventoryTable  } from '../../components'
import { useInventoryList } from '../../utils/index.js'
import { useEffect, useCallback } from 'react'
import api from '../../api'

// import classNames from 'classnames'
// import styles from './styles.module.css'


const Inventory = () => {

  const {
      inventorylist,
      setInventoryList,
    } = useInventoryList()

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


  return <Main>
    <Container>
        <InventoryTable inventorylist={inventorylist} />
    </Container>
  </Main>
}

export default Inventory