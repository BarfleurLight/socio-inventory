import styles from './style.module.css'
import { Nav } from '../index.js'
import Container from '../container'

const Header = ( ) => {
  return <header
    className={styles.header}
  >
    <Container>
      <div className={styles.headerContent}>
        <Nav />
        <div style={{ height: '30px'}}></div>
        {/* <AccountMenu onSignOut={onSignOut} /> */}
      </div>
    </Container>
  </header>
}

export default Header