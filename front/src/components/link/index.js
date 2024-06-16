import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import cn from 'classnames'


const LinkComponent = ({ href, title, className, activeClassName }) => {
  return <NavLink 
    to={href} className={({ isActive }) => cn(styles.link, className, { [activeClassName]: isActive })}
  >
    {title}
  </NavLink>
}

export default LinkComponent


// href
// title
// class