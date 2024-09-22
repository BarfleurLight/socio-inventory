import React from 'react'
import styles from './style.module.css'
import { Textfit } from 'react-textfit';


const ImportNewCard = ({ 
    id,
    fullname,
    serial_number,
    status_doc,
    current_responsible,
    according_data,
    balans_price
 }) => {
  return <div className={styles.card}>
    <div className={styles.card_header}>
      <div className={styles.card_serial_number}>{serial_number}</div>
      <Textfit className={styles.card_fullname} mode="multi" min={12} max={22} >{fullname}</Textfit>
    </div>
    <div className={styles.card_details}>
        <div>{status_doc}</div>
        <div>{current_responsible}</div>
        <div>{according_data}</div>
        <div>{balans_price}</div>
    </div>
  </div>
}

export default ImportNewCard