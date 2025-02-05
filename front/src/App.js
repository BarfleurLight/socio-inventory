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
  InventoryDetail,
  Models,
  Consumables,
  Create,
  Import,
  ErrorPage,
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
          path='/inventory/:id'
          element={<InventoryDetail />}
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
          path='/error'
          element={<ErrorPage />}
        />
        <Route 
          path='/'
          element={ <Navigate to='/inventory' /> }
          />
        <Route 
          path='*'
          element={ <Navigate to='/error' /> }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
