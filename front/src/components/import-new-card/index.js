import React from 'react'
import styles from './style.module.css'


const ImportNewCard = ({ 
    id,
    fullname,
    serial_number,
    status_doc,
    current_responsible,
    according_data,
    balans_price
 }) => {
    const fullnameLength = fullname && typeof fullname === 'string' ? fullname.length : null;
    
  return <div className={styles.card}>
    <div className={styles.card_header}>
      <div className={styles.card_serial_number}>{serial_number}</div>

      <div className={styles.card_fullname} style={{
          fontSize: `calc(1.5rem - 0.${Math.ceil(fullnameLength/50)}rem)`, 
        }}>{fullname}</div>
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