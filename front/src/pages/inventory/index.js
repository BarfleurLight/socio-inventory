import { Container, Main, InventoryTable  } from '../../components'
import { useInventoryList } from '../../utils/index.js'
import { useEffect } from 'react'
import api from '../../api'

// import classNames from 'classnames'
// import styles from './styles.module.css'


const Inventory = () => {

  const {
      inventorylist,
      setInventoryList,
    } = useInventoryList()

  const getInventoryList = () => {
      api
        .getInventoryList()
        .then(res => {
          const { results } = res
          setInventoryList(results)
        })
    }
  
  useEffect(_ => {
    getInventoryList()
    }, [])


  return <Main>
    <Container>
      {/* <ControlPanel />
        <InventoryList>
          <InventoryHeader />
          {inventorylist.map(inventory => <Inventory
            {...inventory}
          />)}
        </InventoryList> */}
        <InventoryTable inventorylist={inventorylist} />
    </Container>
  </Main>
}

export default Inventory