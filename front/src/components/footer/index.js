import styles from './style.module.css'
import { Container, LinkComponent } from '../index'

const Footer = () => {
  return <footer className={styles.footer}>
      <Container className={styles.footer__container}>
        <LinkComponent href='#' title='Socio Inventory' className={styles.footer__brand} />
        <LinkComponent href='#' 
        title='Copyright © 1998–2024 социологический факультет МГУ имени М.В.Ломоносова' 
        className={styles.footer__center} />
        <LinkComponent href='#' title='Obrishti M.V' className={styles.footer__center} />
      </Container>
  </footer>
}

export default Footer