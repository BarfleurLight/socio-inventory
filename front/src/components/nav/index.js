import styles from './style.module.css'
import cn from 'classnames'
import { LinkComponent } from '../index'
import navigation from '../../configs/navigation'
import emblemImg from '../../images/emblemImg.png'

const Nav = ({ orders }) => {
  return <nav className={styles.nav}>
    <div className={styles.nav__container}>
      <ul className={styles.nav__items}>
      <li className={cn(styles.nav__item)}>
            <LinkComponent
          title={<img src={emblemImg} alt="" 
          style={{ height: '30px' }}
          />}
          activeClassName={styles.nav__logo}
          href={'/inventory'}
          exact
          className={styles.nav__logo}
        /></li>

        {navigation.map(item => {
        //   if (!loggedIn && item.auth) { return null }
          return <li className={cn(styles.nav__item, {
            [styles.nav__item_active]: false
          })} key={item.href}>
            <LinkComponent
              title={item.title}
              activeClassName={styles.nav__link_active}
              href={item.href}
              // exact
              className={styles.nav__link}
            />
            {/* {item.href === '/cart' && orders > 0 && <span className={styles['orders-count']}>{orders}</span>} */}
          </li>
        })}
      </ul>
    </div>
  </nav>
}

export default Nav
