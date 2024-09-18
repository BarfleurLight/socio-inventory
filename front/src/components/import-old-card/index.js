import React from 'react'
import styles from './style.module.css'
import ImportNewCard from '../import-new-card';
import { Img } from '../../components';
import { useState } from 'react'
import cn from 'classnames'


const ImportOldCard = ({ 
    id,
    image,
    fullname,
    shortname,
    model,
    serial_number,
    status_real,
    status_doc,
    status_online,
    current_responsible,
    room_real,
    room_doc,
    according_data,
    balans_price
 }) => {
    const [isOpen, setIsOpen] = useState(false);


  return <div className={cn(styles.card, {[styles.show]: isOpen})}>
    <div hidden={serial_number} >Карточка не найдена</div>
    <div className={styles.card_body} hidden={!serial_number} > 
        <ImportNewCard 
          fullname={fullname}
          serial_number={serial_number}
          status_doc={status_doc}
          current_responsible={current_responsible}
          according_data={according_data}
          balans_price={balans_price}
        />
        <div className={cn(styles.card_details, {[styles.show]: isOpen})} >
          <button onClick={() => setIsOpen(!isOpen)}>Подробнее</button>
          <div className={styles.details} >
          <Img className={styles.image} src={image}/>
            {/* <p>{model.name}</p> className={cn(styles.card_summary, {[styles.show]: isOpen})}*/}
            <p>{status_real}</p>
            <p>{status_online}</p>
            <p>{room_real}</p>
            <p>{room_doc}</p>
        </div>
        </div>

    </div>
  </div>
}

export default ImportOldCard