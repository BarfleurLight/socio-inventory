import { Container, Main, Model } from '../../components'
import { useModels } from '../../utils/index.js'
import { useEffect, useCallback } from 'react'
import api from '../../api'

// import classNames from 'classnames'
import styles from './style.module.css'


const Models = () => {
  const {
    models,
    setModels,
  } = useModels()

  const getModels = useCallback(() => {
    api.getModels()
      .then(res => {
        const { results } = res;
        setModels(results);
      });
  }, [setModels]);

useEffect(_ => {
  getModels()
  }, [getModels])

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