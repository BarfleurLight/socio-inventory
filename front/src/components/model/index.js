import React from 'react'
import styles from './style.module.css'
import { LinkComponent, Img } from '../index.js'
import { ModelsIcon } from '../icons'

const Model = ({
    id,
    image,
    name,
    model_type,
    count,
  }) => {
  return <div className={styles.model}>
    <LinkComponent
        className={styles.model__title}
        href={`/models/${id}`}
        title={<Img className={styles.model__image} src={image} />}
    />
    <div className={styles.model__body}>
      <LinkComponent
          className={styles.model__title}
          href={`/models/${id}`}
          title={name}
      />
      <LinkComponent
          className={styles.model__count}
          href={`/models/${id}`}
          title={
            <div className={styles.model__count}>
              <ModelsIcon type={model_type} />{count}
            </div>
          }
      />
    </div>  
  </div>
}

export default Model