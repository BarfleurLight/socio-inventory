import { Container, Main, Model } from '../../components'
import { useModels } from '../../utils/index.js'
import { useEffect, useCallback } from 'react'
import api from '../../api'
import styles from './style.module.css'


const Models = () => {
  const {
    models,
    setModels,
  } = useModels()

  const getModels = () => {
    api.getModels()
      .then(models => {
        setModels(models);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

useEffect(_ => {
  getModels()
  }, [])

  return <Main>
    <Container className={styles.models}>
    {models.map(model => 
      <Model 
        key={model.id}
        {...model}/>
    )}
    </Container>
  </Main>
}

export default Models