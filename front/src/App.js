import './App.css';
import React, { useState } from 'react'
import { Header, Footer } from './components'
import styles from './styles.module.css'
import cn from 'classnames'
import hamburgerImg from './images/hamburger-menu.png'
import emblemImg from './images/emblemImg.png'

function App() {
  const [ menuToggled, setMenuToggled ] = useState(false)
  const [ orders, setOrders ] = useState(0)

  const updateOrders = (add) => {
    if (!add && orders <= 0) { return }
    if (add) {
      setOrders(orders + 1)
    } else {
      setOrders(orders - 1)
    }
  }

  return (
    <div className={cn("App", {
      [styles.appMenuToggled]: menuToggled
    })}>
      <div
        className={styles.menuButton}
        onClick={_ => setMenuToggled(!menuToggled)}
      >
        <img src={hamburgerImg} alt="" />
      </div>
      <div
      className={styles.logoButton}
      >
        <img src={emblemImg} alt=""/>
      </div>
      <Header orders={orders} />
      <Footer />
    </div>
  );
}

export default App;
