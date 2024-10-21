import React from 'react'
import styles from './style.module.css'
import ImportNewCard from '../import-new-card';
import { Img } from '../../components';
import { ImportDetailsButtonIcon } from '../icons'
import cn from 'classnames'


const ImportOldCard = ({ 
    id,
    image,
    fullname,
    shortname,
    model={},
    serial_number,
    status_real,
    status_doc,
    status_online,
    current_responsible,
    room_real,
    room_doc,
    according_data,
    balans_price,
    isOpen,
    setIsOpen,
 }) => {

  return <div className={styles.old_card} >
      <div className={styles.short_card}>
        <div hidden={serial_number} >Карточка не найдена</div> 
        <ImportNewCard 
          fullname={fullname}
          serial_number={serial_number}
          status_doc={status_doc}
          current_responsible={current_responsible}
          according_data={according_data}
          balans_price={balans_price}
        />
      </div>
        <div className={styles.full_card}  hidden={!serial_number}>
          <div className={cn(styles.button_containeer, {[styles.show]: !serial_number})}>
            <span className={styles.button} onClick={() => setIsOpen(!isOpen)} >
              <ImportDetailsButtonIcon open={isOpen} size={16} hidden={!serial_number}/>
              <span className={styles.button_text}>Подробнее</span>
            </span>
          </div>
          <div className={styles.card_details} >
            <Img className={styles.image} src={image}/>
              <p>{model.name}</p>
              <p>{status_real}</p>
              <p>{status_online}</p>
              <p>{room_real}</p>
              <p>{room_doc}</p>
              <p>asdasdasd</p>
          </div>
        </div>
    </div>
}

export default ImportOldCard