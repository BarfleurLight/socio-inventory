import './App.css';
import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header, Footer } from './components'
import styles from './styles.module.css'
import cn from 'classnames'
import hamburgerImg from './images/hamburger-menu.png'
import emblemImg from './images/emblemImg.png'

import {
  Inventory,
  Models,
  Consumables,
  Create,
  Import
} from './pages'

function App() {
  const [ menuToggled, setMenuToggled ] = useState(false)

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
      <Header />
      <Routes>
        <Route 
          path='/inventory'
          element = { <Inventory />}
        />
        <Route 
          path='/models'
          element = { <Models />}
        />
        <Route 
          path='/consumables'
          element = { <Consumables />}
        />
        <Route 
          path='/create'
          element = { <Create />}
        />
        <Route 
          path='/import'
          element = { <Import />}
        />
        <Route 
          path='/'
          element={ <Navigate to='/inventory' /> }
          />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
