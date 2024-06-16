import styles from './style.module.css'
import { Nav } from '../index.js'
import Container from '../container'

const Header = ({ orders }) => {
  return <header
    className={styles.header}
  >
    <Container>
      <div className={styles.headerContent}>
        <Nav orders={orders} />
        <div style={{ height: '30px'}}></div>
        {/* <AccountMenu onSignOut={onSignOut} /> */}
      </div>
    </Container>
  </header>
}

export default Header